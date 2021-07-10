const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;

    const results = title
        ? repositories.filter(repositories => repositories.title.includes(title))
        : repositories;

    return response.json(results);
});

app.post("/repositories", (request, response) => {
  const {title,url, techs, likes} = request.body;

  const repository = { id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const {title,url, techs, likes} = request.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id == id);

    if (repositoryIndex < 0 ) {
        return response.status(400).json({error: 'Repository not found'})
    }

    const repository = {
      title,
      url,
      techs,
      likes
    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
