<?php

namespace App\DataFixtures;

use App\Entity\Actor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ActorFixtures extends Fixture
{
    /**
     * Constructor
     *
     * @param array $actors
     */
    public function __construct(
        private array $actors = [],
    ) {}

    /**
     * Load fixture
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager): void
    {
        foreach ($this->getData() as $data) {
            $actor = new Actor();
            $actor->setName($data['name']);

            $manager->persist($actor);

            // set reference for pivot table
            $actor->ref = $data['ref'];
            array_push($this->actors, $actor);
        }

        $manager->flush();

        // Add pivot data references
        foreach ($this->actors as $actor) {
            $this->addReference($actor->ref, $actor);
        }
    }

    /**
     * Get fixture data
     *
     * @return array
     */
    private function getData(): array
    {
        return [
            [
                'name' => 'Mark Hamill',
                'ref'  => 'actor_1'
            ],
            [
                'name' => 'Ryan Gosling',
                'ref'  => 'actor_2'
            ],
            [
                'name' => 'Harrison Ford',
                'ref'  => 'actor_3'
            ],
        ];
    }
}
