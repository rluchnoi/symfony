DC := docker-compose
FPM := $(DC) exec fpm
NODE := $(DC) exec node
ARTISAN := $(FPM) php artisan

env:
	cp .env.example .env

build:
	@$(DC) build

start-logs:
	@$(DC) up

start:
	@$(DC) up -d

stop:
	@$(DC) stop

down:
	@$(DC) down

ssh:
	@$(FPM) /bin/bash

composer-install:
	@$(FPM) composer install

node:
	@$(NODE) /bin/bash

yarn-install:
	@$(NODE) yarn install

yarn-watch:
	@$(NODE) yarn run watch

queue-listen:
	@$(ARTISAN) queue:listen --timeout=2000

queue-retry:
	@$(ARTISAN) queue:retry all

keygen:
	@$(ARTISAN) key:generate

migrate:
	@$(ARTISAN) migrate

seed:
	@$(ARTISAN) db:seed

start-expanded: start migrate seed

refresh: composer-install yarn-install migrate seed

setup: env build start composer-install yarn-install

