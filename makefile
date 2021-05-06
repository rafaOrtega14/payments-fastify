include .env.local
export $(shell sed 's/=.*//' .env.local)

include .env
export $(shell sed 's/=.*//' .env)

up:
	docker-compose up -d --build

up-prod:
	@rm -rf build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down: 
	docker-compose down

logs:
	docker-compose logs -f fastify-backbone

reload: down up

clean: down
	@echo "=============Cleaning up============="
	docker system prune -f
	docker volume prune -f

build:
	docker-compose build

restart: clean build up

attach:
	docker-compose exec fastify-backbone bash

pgadminLogs:
	docker-compose logs -f pgadmin

dbLogs:
	docker-compose logs -f db

allLogs:
	docker-compose logs -f