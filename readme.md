Bookstore API
A simple RESTful API for managing a book collection using Node.js, Express, and MongoDB, with a frontend interface.
Prerequisites

Node.js (v14 or higher)
MongoDB (running locally on default port 27017)
Web browser

Setup

Clone or download this repository.
Navigate to the project directory:cd bookstore-api


Install dependencies:npm install


Ensure MongoDB is running on your system:mongod


Start the server:npm start



Usage

Open a browser and navigate to http://localhost:3000 to access the frontend.
Use the form to add new books.
View, edit, or delete existing books from the list.

API Endpoints

GET /api/books: Retrieve all books
POST /api/books: Create a new book
PUT /api/books/:id: Update a book
DELETE /api/books/:id: Delete a book

Folder Structure

server.js: Main server file with API logic
public/: Frontend files
index.html: Frontend interface
styles.css: Custom CSS styles


package.json: Project configuration and dependencies
README.md: This file

Bookstore API Documentation
This document describes the RESTful API for managing a book collection. The API is built with Node.js, Express, and MongoDB, and supports CRUD operations for books. The base URL is http://localhost:3000.
Endpoints
1. Get All Books

Endpoint: /api/books
Method: GET
Description: Retrieves a list of all books in the database.
Request Body: None
Response:
Status: 200 OK
Content-Type: application/json
Body: Array of book objects, each containing _id, title, author, year, genre, and __v.


Sample Response:[
  {
    "_id": "60c72b2f9b1e8a1f5c8b4567",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "genre": "Fiction",
    "__v": 0
  },
  {
    "_id": "60c72b2f9b1e8a1f5c8b4568",
    "title": "1984",
    "author": "George Orwell",
    "year": 1949,
    "genre": "Dystopian",
    "__v": 0
  }
]


Error Responses:
500 Internal Server Error: { "message": "Error retrieving books" }



2. Create a New Book

Endpoint: /api/books
Method: POST
Description: Creates a new book in the database.
Request Body:
Content-Type: application/json
Fields (all required):
title (string): The title of the book.
author (string): The author of the book.
year (number): The publication year.
genre (string): The genre of the book.


Sample Request Body:{
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "genre": "Dystopian"
}




Response:
Status: 201 Created
Content-Type: application/json
Body: The created book object with _id, title, author, year, genre, and __v.


Sample Response:{
  "_id": "60c72b2f9b1e8a1f5c8b4568",
  "title": "1984",
  "author": "George Orwell",
  "year": 1949,
  "genre": "Dystopian",
  "__v": 0
}


Error Responses:
400 Bad Request: { "message": "Invalid book data" } (e.g., missing required fields)
500 Internal Server Error: { "message": "Error creating book" }



3. Update a Book

Endpoint: /api/books/:id
Method: PUT
Description: Updates an existing book by its ID. Only provided fields are updated; others remain unchanged.
URL Parameters:
:id (string): The MongoDB _id of the book to update.


Request Body:
Content-Type: application/json
Fields (optional):
title (string): New title of the book.
author (string): New author of the book.
year (number): New publication year.
genre (string): New genre of the book.


Sample Request Body:{
  "title": "The Great Gatsby (Updated)",
  "year": 1926
}




Response:
Status: 200 OK
Content-Type: application/json
Body: The updated book object.


Sample Response:{
  "_id": "60c72b2f9b1e8a1f5c8b4567",
  "title": "The Great Gatsby (Updated)",
  "author": "F. Scott Fitzgerald",
  "year": 1926,
  "genre": "Fiction",
  "__v": 0
}


Error Responses:
400 Bad Request: { "message": "Invalid update data" }
404 Not Found: { "message": "Book not found" }
500 Internal Server Error: { "message": "Error updating book" }



4. Delete a Book

Endpoint: /api/books/:id
Method: DELETE
Description: Deletes a book by its ID.
URL Parameters:
:id (string): The MongoDB _id of the book to delete.


Request Body: None
Response:
Status: 200 OK
Content-Type: application/json
Body: Confirmation message.


Sample Response:{ "message": "Book deleted" }


Error Responses:
404 Not Found: { "message": "Book not found" }
500 Internal Server Error: { "message": "Error deleting book" }



Usage Notes

Base URL: All endpoints are relative to http://localhost:3000.
Authentication: No authentication is required.
Error Handling: Errors return a JSON object with a message field describing the issue.
Testing: Use tools like Postman, cURL, or the provided frontend (http://localhost:3000) to interact with the API.
Prerequisites: Ensure MongoDB is running locally on port 27017 and the server is started with npm start.

Example Workflow

Use GET /api/books to list all books and note the _id of a book.
Use POST /api/books to add a new book.
Use PUT /api/books/:id to update a book’s details.
Use DELETE /api/books/:id to remove a book.
Verify changes with GET /api/books or the frontend.

For further assistance, refer to the README.md in the project directory.
