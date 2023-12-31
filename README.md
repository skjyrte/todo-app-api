## Todo app api

Simple API of todo list written in js + express + mongoose.
It works with client SPA - todo-app-client.

## Features:

- Different routes for adding, modifying, deleting todos.
- Server management by Express.
- Permanent database by mongoDB – mongoose.
- Docker configuration.
- Infinite scroll pagination (2 entries per page for illustration).
- Error handling.

## Getting started:

1. Pull both server and client apps from github:

- todo-app-client
  https://github.com/skjyrte/todo-app-client
- todo-app-api
  https://github.com/skjyrte/todo-app-api

### Server app:

2.  **npm install**
3.  **npm run dev** – development environment on localhost:4000
4.  or type **docker compose up** – building an image in docker (production environment).
