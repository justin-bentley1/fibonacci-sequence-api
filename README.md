# fibonacci-sequence-api

Graphql API that computes and returns the nth number in the Fibonacci sequence.

## Features

- GraphQL API endpoint to compute `fibonacci(n)`
- Unit test for Fibonacci calculation and api validation
- Prometheus metrics via `/metrics`
- Docker Compose
- Launch.json for VSCode
- NVM
- Github Actions to
    - Build images using Docker
    - Run unit tests 
    - Artillery performance testing
    - Prometheus metric validation

---

## Tech Stack
- TypeScript
- GraphQL Yoga
- Prometheus + prom-client
- Docker & Docker Compose
- GitHub Actions
- Artillery (performance testing)

---

## Getting started

1. Clone the repo.
2. Run `npm install`
3. Run `npm run dev`
4. Access the api at [http://localhost:3000/graphql](http://localhost:3000/graphql)
5. Optionally you can use the [launch.json](.vscode/launch.json) to run the code in VSCode with the debugger attached.

## Deployment

The api is containerized using Docker.

The [docker-compose.yml](docker-compose.yml) can be used to deploy to container services that support Docker Compose.

The [Dockerfile](Dockerfile) can be used to build a image to container services or registrys supporting Docker images.

## Continuous Integration/Continuous Deployment

The api currently uses GitHub actions for Continuous Integration.

Pushes to the main branch kicks off the GitHub Actions

The following file configures the GitHub Actions Workflow [ci-cd.yml](.github/workflows/ci-cd.yml)

- Build images using Docker
- Run unit tests 
- Artillery performance testing
- Prometheus metric validation

The workflow could be further modified to handle zero downtime deployments.

## Monitoring/Logging

The api leverages Prometheus for performance logging.

The api also supports live and readiness checks though currently since the api does not rely on any other services, the readiness check provides the same functionality as the live check.

Metrics can be accessed at [http://localhost:3000/metrics](http://localhost:3000/metrics)

Currently logging is done on the console.  Logs can be viewed using docker-compose logs.

Logging could be improved using a custom structured logger such a pino.

Logging could also be improved by routing logs to a external system such as Splunk.

## Scaling

In order to handle a high number of request, Auto-scaling could be used to leverage the Prometheus metrics when latency increases.

Futhermore, a in-memory cache like Redis could be used to offload the api for sequences that have already been requested.
