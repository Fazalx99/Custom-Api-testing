const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectDB } = require('../../server');
const Book = require('../../models/book');

describe('Book Integration Tests', () => {
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

  it('should create and retrieve a book', async () => {
    const bookData = {
      title: 'Integration Book',
      author: 'Integration Author',
      year: 2022,
      genre: 'Non-Fiction'
    };
    await Book.create(bookData);

    const books = await Book.find();
    expect(books.length).toBe(1);
    expect(books[0].title).toBe(bookData.title);
  });

  it('should update a book', async () => {
    const book = await Book.create({
      title: 'Old Title',
      author: 'Old Author',
      year: 2020,
      genre: 'Fiction'
    });

    book.title = 'New Title';
    await book.save();

    const updatedBook = await Book.findById(book._id);
    expect(updatedBook.title).toBe('New Title');
  });

  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Delete Book',
      author: 'Delete Author',
      year: 2023,
      genre: 'Fiction'
    });

    await Book.findByIdAndDelete(book._id);
    const deletedBook = await Book.findById(book._id);
    expect(deletedBook).toBeNull();
  });
});