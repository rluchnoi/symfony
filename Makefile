DC := docker-compose
FPM := $(DC) exec fpm
NODE := $(DC) exec node
SYMFONY := $(FPM) symfony console

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
	@$(NODE) yarn encore dev --watch

# keygen:
# 	@$(ARTISAN) key:generate
#
# migrate:
# 	@$(ARTISAN) migrate

fixtures:
	@$(SYMFONY) doctrine:fixtures:load

refresh: composer-install yarn-install migrate seed

setup: env build start composer-install yarn-install

