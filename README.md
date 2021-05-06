# README

Fastify-backbone is a template to bootstrapping fastify servers with several functionalities attached out of the box.

## Local set up

-   Files:
    You will need a .env to start the server. You can simply copy the provided .env.local
    Also, changes on .env file will override the .env.local configuration inside makefile.

-   Local development
    You need to install [docker](https://www.docker.com/) in your computer.
    -- Run `npm i` to tell visual studio your dependencies, types and other npm stuff
    -- Run `make up logs` to start de server and see server logs
    -- A client (pgadmin) for postgres will be available via [localhost at port 5433](http://localhost:5433)
    -- You can inspect the server docker container with `make attach`
    -- At now, for changes in node dependencies, you need to restart the server with `make restart logs`
    -- To shutdown the server use `make down`

## Testing

To be filled by Rafa
