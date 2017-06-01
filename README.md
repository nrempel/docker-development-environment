# Super Productive Docker Development Environment

This repo is a companion to the guide on Docker development environments I wrote [here](https://nrempel.com/guides/docker-development-environment.html). 

## How to use

First, download [Docker](https://www.docker.com/community-edition) and install it on your machine. Start Docker and clone this repository. From the cloned repository, run `./manage build` to build the docker image from the Dockerfile. Then run `./manage start` to run all of the containers defined in `docker-compose.yml`.

For more information, take a gander at the [guide](https://nrempel.com/guides/docker-development-environment.html) that goes with this example.
