# Books & Authors

Demo App which uses Microservice Architecture.

There are 7 Microservices, each has it's own Docker Container.

## Usage

To run this project locally you need only [`Docker`](https://www.docker.com/):

1. Clone [this repo](https://github.com/fabritsius/books-and-authors) (or download)
2. Run `docker-compose up` in the root of the project
3. Wait for the installation to finish⏳
4. Visit [localhost:8080](http://localhost:8080) in your browser

## API

- `GET  /top5`
- `POST /author {name, age}`
- `POST /book {title, authorId, pages}`

The API is available on port `80`.