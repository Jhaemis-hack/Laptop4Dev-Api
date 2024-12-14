

# Laptop4Dev API

This is a simple API built using **Express.js** and **MongoDB** to manage participants registering their interest for the Laptop4Dev program. It allows viewing all Applicants, registering new ones, and checking the total number of participants.

## Features

- Register participants with required details.
- View all Applicants who have shown interest in the program.
- Check the total count of participants.
- Simple error handling for missing fields or failed operations.

## Requirements

- Node.js
- MongoDB (local or cloud database)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Jhaemis-hack/Laptop4Dev-Api.git
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies:

```bash
cd Laptop4Dev-Api
npm install
```

### 3. Run the Server

Start the server on port `4000`:

```bash
npm start
```

Your server will be running at `http://localhost:4000`.

### 4. Database Setup

This app uses **MongoDB** for storing participant data. Ensure you have MongoDB installed and running locally or use a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

The database is set to connect to `mongodb://localhost:27017/lap4dev`. Change the connection string in the `app.js` file if needed for a different database.

## API Endpoints

### 1. `GET /`
Retrieve all participants who have registered their interest for the program.

**Response:**
```json
{
    "message": [
        {
            "firstname": "John",
            "lastname": "Doe",
            "email": "johndoe@example.com",
            "phoneNo": 1234567890,
            "purpose": "Learn development"
        },
    ]
}
```

### 2. `POST /register`
Register a new participant by providing the following details in the request body:

- `firstname` (String) - Required
- `lastname` (String) - Required
- `email` (String) - Required
- `phoneNo` (Number) - Required
- `purpose` (String) - Required

**Request Example:**
```json
{
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "janedoe@example.com",
    "phoneNo": 9876543210,
    "purpose": "Build my first app"
}
```

**Response:**
```json
{
    "message": "Registration successful",
    "data": {
        "firstname": "Jane",
        "lastname": "Doe",
        "email": "janedoe@example.com",
        "phoneNo": 9876543210,
        "purpose": "Build my first app"
    }
}
```

### 3. `GET /participants/count`
Retrieve the total number of participants who have registered.

**Response:**
```json
{
    "count": 100
}
```

## Error Handling

- **400 - Bad Request**: Missing required fields or invalid data.
- **404 - Not Found**: Route not found.
- **500 - Internal Server Error**: Server error.

## Postman Documentation

Follow the link below to view postman documentation fot this API: https://documenter.getpostman.com/view/30020558/2sAYHzF2qt#8ce79b57-a3eb-4948-8f30-a67be6ee9f83
