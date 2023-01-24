<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\MessageRepository;
use Doctrine\Common\Collections\Collection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class ChatController extends AbstractController
{
    private UserInterface $user;

    public function __construct(
        private ChatRepository $chatRepository,
        private Security $security,
        private SerializerInterface $serializer,
        private MessageRepository $messageRepository,
    ) {
        $this->user = $this->security->getUser();
    }

    #[Route('/loadChat', name: 'app_loadChat', methods: ['POST'])]
    public function loadChat(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());

        $chat = $this->chatRepository->findOneById($data->selectedChat);

        if ($chat) {
            $messagesSorted = [];

            foreach ($chat->getMessages() as $index => $message) {
                $messagesSorted[$index]['time']    = $message->getTime();
                $messagesSorted[$index]['content'] = $message->getContent();
                $messagesSorted[$index]['author']  = $message->getAuthor()
                    ->getName();
            }

            $chatName = $this->getChatName($chat->getUsers());

            return new JsonResponse([
                'messages' => $this->serializer->serialize($messagesSorted, 'json'),
                'chatName' => $chatName
            ]);
        }

        return new JsonResponse([
            'messages' => $this->serializer->serialize([], 'json'),
            'chatName' => ''
        ], 404);
    }

    /**
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    #[Route('/chatsInfo', name: 'app_chatsInfo', methods: ['POST'])]
    public function chatsInfo(): JsonResponse
    {
        $username = $this->user->getName();
        $chats = $this->user->getChats();

        return new JsonResponse([
            'username' => $this->user->getName(),
            'chatsPreviewInfo'  => $this->serializer
                ->serialize($this->parseChats($chats), 'json')
        ]);
    }

    /**
     * Parse chats - select useful data
     *
     * @param Collection<Chat> $chats
     * @return array
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    private function parseChats(Collection $chats): array
    {
        $chatsParsed = [];

        foreach ($chats as $index => $chat) {
            $chatId = $chat->getId();

            $chatsParsed[$index]['chatName']    = $this->getChatName($chat->getUsers());
            $chatsParsed[$index]['chatId']      = $chatId;
            $chatsParsed[$index]['lastMessage'] = $this->messageRepository
                ->getLastMessageOfChat($chatId)
                ->getContent();
        }

        return $chatsParsed;
    }

    /**
     * Parse messages - select useful data
     *
     * @param Collection<Message> $messages
     * @return array
     */
    private function parseMessages(Collection $messages): array
    {
        $messagesParsed = [];

        foreach ($messages as $index => $message) {
            $messagesParsed[$index]['time']    = $message->getTime();
            $messagesParsed[$index]['content'] = $message->getContent();
            $messagesParsed[$index]['author']  = $message->getAuthor()
                ->getName();
        }

        return $messagesParsed;
    }

    /**
     * Get the chat name based on participants
     *
     * @param Collection $users
     * @return string
     */
    private function getChatName(Collection $users): string
    {
        $chatName = '';

        foreach ($users as $user) {
            $username = $user->getName();

            if ($username === $this->user->getName()) {
                continue;
            }

            if ($chatName === '') {
                $chatName .= $username;
            } else {
                $chatName .= (', ' . $username);
            }
        }

        return $chatName;
    }
}
