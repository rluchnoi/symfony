<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class UserController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private Security $security,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/profile', name: 'app_profile', methods: ['POST'])]
    public function profile(): JsonResponse
    {
        $user = $this->security->getUser();

        $selectedData = [
            'name'  => $user->getName(),
            'email' => $user->getEmail()
        ];

        return new JsonResponse([
            'user' => $this->serializer->serialize($selectedData, 'json')
        ]);
    }

    #[Route('/findUsersByName', name: 'app_findUser', methods: ['POST'])]
    public function findUsersByName(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent());

        $users = $this->userRepository->findByName($data->username);

        return new JsonResponse([
            'users' => $this->serializer->serialize($users, 'json')
        ]);
    }
}
