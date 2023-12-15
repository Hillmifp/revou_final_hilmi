# Disaster Management System Documentation

## Table of Contents

- [Introduction](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#introduction)
- [Controllers](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#controllers)
  - [disastersController.js](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#disasterscontrollerjs)
- [Middleware](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#middleware)
  - [authenticationMiddleware.js](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#authenticationmiddlewarejs)
- [Routes](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#routes)
  - [disastersRoutes.js](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#disastersroutesjs)
- [App Configuration](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#app-configuration)
  - [app.js](https://chat.openai.com/c/2c692a55-d4cf-4aa9-8275-b33004de5cb0#appjs)

## Introduction

This documentation provides an overview of the Disaster Management System codebase. The system allows users to create, retrieve, update, and delete disaster-related information.

## Controllers

### disastersController.js

The `disastersController.js` file contains the implementation of CRUD operations related to disasters. It interacts with the database to perform actions such as creating a new disaster, retrieving all disasters, retrieving a specific disaster by ID, updating a disaster, and deleting a disaster.

#### Methods

- `createDisaster(req, res)`: Creates a new disaster entry in the database based on the information provided in the request body.
- `getAllDisasters(req, res)`: Retrieves all disasters from the database.
- `getDisasterById(req, res)`: Retrieves a specific disaster based on the provided disaster ID.
- `updateDisaster(req, res)`: Updates an existing disaster entry in the database with the information provided in the request body.
- `deleteDisaster(req, res)`: Deletes a specific disaster from the database based on the provided disaster ID.

## Middleware

### authenticationMiddleware.js

The `authenticationMiddleware.js` file contains middleware for user authentication using JSON Web Tokens (JWT). It checks for the presence and validity of a token in the request header, adding user ID and role information to the request object if the token is valid.

## Routes

### disastersRoutes.js

The `disastersRoutes.js` file defines the API routes related to disasters. It utilizes the `express` router to handle HTTP requests and connects them to the appropriate controller methods.

#### Routes

- `POST /`: Endpoint for creating a new disaster. Requires authentication using the `authenticationMiddleware`.
- `GET /:id`: Endpoint for retrieving a specific disaster by ID. Requires authentication using the `authenticationMiddleware`.
- `GET /`: Endpoint for retrieving all disasters. Requires authentication using the `authenticationMiddleware`.
- `PUT /:id`: Endpoint for updating an existing disaster. Requires authentication using the `authenticationMiddleware`.
- `DELETE /:id`: Endpoint for deleting a specific disaster by ID. Requires authentication using the `authenticationMiddleware`.

## App Configuration

### app.js

The `app.js` file configures the Express application. It sets up the server, mounts the disaster routes, and defines a status endpoint.

#### Configuration

- `express.json()`: Middleware to parse incoming JSON requests.
- `app.use("/disasters", disastersRoutes)`: Mounts the disaster routes under the "/disasters" path.
- `app.get("/status", ...)`: Defines an endpoint to check the status of the server.
- `app.listen(port, ...)`: Starts the server on the specified port.
