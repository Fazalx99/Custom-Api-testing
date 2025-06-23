const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectDB } = require('../../server');
const Book = require('../../models/book');

describe('Book API Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Book.deleteMany({});
  });

  it('GET /api/books should return all books', async () => {
    await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      year: 2020,
      genre: 'Fiction'
    });

    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Test Book');
  });

  it('POST /api/books should create a book', async () => {
    const bookData = {
      title: 'New Book',
      author: 'New Author',
      year: 2021,
      genre: 'Fiction'
    };

    const res = await request(app)
      .post('/api/books')
      .send(bookData)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(bookData.title);
    expect(res.body._id).toBeDefined();
  });

  it('PUT /api/books/:id should update a book', async () => {
    const book = await Book.create({
      title: 'Old Book',
      author: 'Old Author',
      year: 2020,
      genre: 'Fiction'
    });

    const updateData = { title: 'Updated Book', year: 2021 };
    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .send(updateData)
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Book');
    expect(res.body.year).toBe(2021);
    expect(res.body.author).toBe('Old Author');
  });

  it('DELETE /api/books/:id should delete a book', async () => {
    const book = await Book.create({
      title: 'Delete Book',
      author: 'Delete Author',
      year: 2023,
      genre: 'Fiction'
    });

    const res = await request(app).delete(`/api/books/${book._id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted');

    const deletedBook = await Book.findById(book._id);
    expect(deletedBook).toBeNull();
  });

  it('PUT /api/books/:id should return 404 for non-existent book', async () => {
    const res = await request(app)
      .put('/api/books/60c72b2f9b1e8a1f5c8b4567')
      .send({ title: 'Non-existent' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Book not found');
  });
});