<?php

namespace App\Controller;

use App\Entity\Movie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MoviesController extends AbstractController
{
//    /**
//     * @var EntityManagerInterface
//     */
//    private EntityManagerInterface $entityManager;
//
//    /**
//     * Constructor
//     *
//     * @param EntityManagerInterface $entityManager
//     */
//    public function __construct(EntityManagerInterface $entityManager)
//    {
//        $this->entityManager = $entityManager;
//    }
//
//    #[Route('/movies', name: 'movies', methods: ['GET', 'HEAD'])]
//    public function index(): Response
//    {
//        $repository = $this->entityManager->getRepository(Movie::class);
//        $movies = $repository->findAll();
//
//        return $this->render('movies.html.twig', [
//            'movies' => $movies
//        ]);
//    }
}
