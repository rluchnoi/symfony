<?php

namespace App\DataFixtures;

use App\Entity\Movie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class MovieFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        foreach ($this->getData() as $data) {
            $movie = new Movie();
            $movie->setTitle($data['title']);
            $movie->setReleaseYear($data['releaseYear']);
            $movie->setDescription($data['description']);
            $movie->setImagePath($data['imagePath']);

            // add movie actors by references
            foreach ($data['actorRefs'] as $actorRef) {
                $movie->addActor($this->getReference($actorRef));
            }

            $manager->persist($movie);
        }

        $manager->flush();
    }

    private function getData(): array
    {
        return [
            [
                'title'       => 'Blade Runner',
                'releaseYear' => 2017,
                'description' => 'Blade Runner movie description',
                'imagePath'   => 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_FMjpg_UX1000_.jpg',
                'actorRefs'   => ['actor_2', 'actor_3'],
            ],
            [
                'title'       => 'Star Wars: Episode III',
                'releaseYear' => 2005,
                'description' => 'Star Wars: Episode III movie description',
                'imagePath'   => 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8572/9781857239386.jpg',
                'actorRefs'   => ['actor_1'],
            ],
        ];
    }
}

