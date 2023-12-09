# Disaster Management API

## Introduction

This project is a Disaster Management API built using Express.js, MySQL, and JWT for authentication. The API allows users to manage information about disasters, including creating, retrieving, updating, and deleting disaster entries.

## Project Structure

The project is organized into the following structure:

bashCopy code

`/src /controllers - disastersController.js /middleware - authenticationMiddleware.js /routes - disastersRoutes.js - server.js`

- **controllers**: Contains the disaster controller responsible for handling disaster-related logic.
- **middleware**: Includes the authentication middleware for verifying JWT tokens.
- **routes**: Defines the API routes and connects them to the corresponding controller methods.
- **server.js**: The main entry point of the application, where the Express server is configured.

## Installation

To install the project locally, follow these steps:

bashCopy code

`# Clone the repository git clone <repository-url> # Navigate to the project directory cd <project-directory> # Install dependencies npm install`

## Usage

Run the server using the following command:

bashCopy code

`# Run the server npm start`

The server will be accessible at `http://localhost:3000`.

## Endpoints

### `POST /disasters`

Create a new disaster entry.

**Request:**

jsonCopy code

`{ 
"USER_ID": 1, 
"BEN_DISASTER": "Earthquake", 
"BEN_LOCATION": "City A", 
"BEN_TIME": "2023-12-01T12:00:00", 
"BEN_DESCRIPTION": "Major earthquake in City A" 
}`

**Response:
jsonCopy code

`{ "id": 1 }`

### `GET /disasters`

Retrieve a list of all disasters.

**Response:**

jsonCopy code

`[ { "BEN_ID": 1, "USER_ID": 1, "BEN_DISASTER": "Earthquake", "BEN_LOCATION": "City A", "BEN_TIME": "2023-12-01T12:00:00", "BEN_DESCRIPTION": "Major earthquake in City A" }, // More disaster entries... ]`

### `PUT /disasters/:id`

Update a specific disaster entry.

**Request:**

jsonCopy code

`{ "USER_ID": 1, "BEN_DISASTER": "Updated Earthquake", "BEN_LOCATION": "City B", "BEN_TIME": "2023-12-02T15:30:00", "BEN_DESCRIPTION": "Updated information about the earthquake" }`

**Response:**

jsonCopy code

`{ "message": "Disaster updated successfully" }`

### `DELETE /disasters/:id`

Delete a specific disaster entry.

**Response:**

jsonCopy code

`{ "message": "Disaster deleted successfully" }`

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the `Authorization` header of your requests.

## Contributing

Feel free to contribute to this project by submitting issues or creating pull requests. Follow the contribution guidelines in the repository.

## License

This project is licensed under the [Your License Name] - see the [LICENSE.md](https://chat.openai.com/c/LICENSE.md) file for details.
