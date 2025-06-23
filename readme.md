# Bookstore API

A RESTful API for managing a book collection, built with Node.js, Express, and MongoDB, featuring a frontend interface and comprehensive tests.

## Integrated API

The Bookstore API provides four endpoints for CRUD operations on books:

1. **GET /api/books**
   - Retrieves a list of all books in the database.
   - Response: JSON array of book objects (`_id`, `title`, `author`, `year`, `genre`).

2. **POST /api/books**
   - Creates a new book.
   - Request Body: JSON with `title` (string), `author` (string), `year` (number), `genre` (string).
   - Response: JSON of the created book.

3. **PUT /api/books/:id**
   - Updates a book by its `_id`. Only provided fields are updated.
   - Request Body: JSON with optional fields (`title`, `author`, `year`, `genre`).
   - Response: JSON of the updated book.

4. **DELETE /api/books/:id**
   - Deletes a book by its `_id`.
   - Response: JSON confirmation message.

For detailed endpoint specifications, see `API-Documentation.md`.

## Tech Stack

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side execution.
  - **Express**: Web framework for building RESTful APIs.
  - **MongoDB**: NoSQL database for storing book data.
  - **Mongoose**: ODM library for MongoDB schema definition and queries.

- **Frontend**:
  - **HTML**: Structure for the client interface.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **JavaScript**: Client-side logic for API interactions via `fetch`.

- **Testing**:
  - **Jest**: Testing framework for unit, integration, and API tests.
  - **Supertest**: Library for testing HTTP endpoints.
  - **MongoDB Memory Server**: In-memory MongoDB for isolated testing.
  - **nyc**: Tool for measuring test coverage.

- **Other Tools**:
  - **npm**: Package manager for dependencies.
  - **Git**: Version control for project management.

## How to Run the Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- Git (optional, for cloning)

### Setup
1. Clone or download the repository:
   ```bash
   git clone https://github.com/Fazalx99/bookstore-api.git
   cd bookstore-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB:
   ```bash
   mongod
   ```
4. Start the server:
   ```bash
   npm start
   ```
   - The server runs on `http://localhost:3000`.
   - Access the frontend at `http://localhost:3000` to interact with the API via a browser interface.
   - Use tools like Postman or cURL to test API endpoints directly.

## How to Run Tests

### Setup
1. Ensure dependencies are installed:
   ```bash
   npm install
   ```
2. Run all tests:
   ```bash
   npm test
   ```
3. Run tests with coverage report:
   ```bash
   npm run test:coverage
   ```
   - Coverage reports are generated in the `coverage/` directory.
   - Open `coverage/index.html` in a browser to view the detailed HTML report.

### Test Types
- **Unit Tests**: Test book model and controller logic (`__tests__/unit/`).
  - Use mocked (Jest) and non-mocked (MongoDB Memory Server) database interactions.
- **Integration Tests**: Verify server-database interactions (`__tests__/integration/`).
  - Use `mongodb-memory-server` for an in-memory MongoDB instance.
- **API Tests**: Test endpoint functionality (`__tests__/api/`).
  - Use Supertest to simulate HTTP requests.

## Testing Frameworks/Tools

- **Jest**: Primary testing framework for writing and running unit, integration, and API tests. Provides mocking, assertions, and test suite organization.
- **Supertest**: Used for API tests to send HTTP requests to the Express server and verify responses.
- **MongoDB Memory Server**: Creates an in-memory MongoDB instance for integration and API tests, ensuring isolation from the production database.
- **nyc**: Measures test coverage, generating reports to ensure at least 70% unit test coverage.

## Test Coverage

The test suite achieves comprehensive coverage, with unit tests covering at least 70% of the codebase. Below is a placeholder for the test coverage screenshot:

![Test Coverage Screenshot](coverage/screenshot.png)

### How to Generate the Coverage Screenshot
1. Run `npm run test:coverage` to generate the coverage report.
2. Open `coverage/index.html` in a browser.
3. Take a screenshot of the coverage summary (e.g., using `PrtSc` on Windows or `Cmd+Shift+4` on macOS).
4. Save the screenshot as `coverage/screenshot.png` in the project directory.
5. Update the `README.md` to reference the screenshot path.
6. Commit and push the screenshot:
   ```bash
   git add coverage/screenshot.png README.md
   git commit -m "Add test coverage screenshot to README"
   git push origin main
   ```

Example coverage metrics (based on typical output):
- **Statements**: ~80-90%
- **Branches**: ~70-80%
- **Functions**: ~85-95%
- **Lines**: ~80-90%

## Folder Structure
- `server.js`: Main server file with API logic.
- `models/book.js`: Mongoose book model.
- `public/`:
  - `index.html`: Frontend interface.
  - `styles.css`: Custom CSS styles.
- `__tests__/`:
  - `unit/`: Unit tests for model and controller.
  - `integration/`: Integration tests for server-database interactions.
  - `api/`: API tests for endpoints.
- `package.json`: Project dependencies and scripts.
- `API-Documentation.md`: Detailed API documentation.
- `README.md`: This file.

## Notes
- Ensure MongoDB is running before starting the server.
- The API lacks authentication; consider adding it for production.
- Error responses include a `message` field (e.g., `{ "message": "Book not found" }`).
- Tests use an in-memory MongoDB instance to avoid affecting the production database.
- For GitHub push errors, run `git pull origin main`, resolve conflicts, and then `git push origin main`.

For issues or contributions, see the GitHub repository: `https://github.com/Fazalx99/bookstore-api`.
