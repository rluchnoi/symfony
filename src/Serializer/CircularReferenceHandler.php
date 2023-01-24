<?php

namespace App\Serializer;

use App\Entity\Chat;
use App\Entity\User;

class CircularReferenceHandler
{
    public function __invoke($object): string|int|null
    {
        return match ($object) {
            $object instanceof Chat => $object->getId(),
            $object instanceof User => $object->getName(),
            default                 => $object->getId(),
        };
    }
}