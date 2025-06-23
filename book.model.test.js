const mongoose = require('mongoose');
const Book = require('../../models/book');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Book Model Unit Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Book.deleteMany({});
  });

  // Non-mocking test
  it('should create a book successfully', async () => {
    const bookData = {
      title: 'Test Book',
      author: 'Test Author',
      year: 2020,
      genre: 'Fiction'
    };
    const book = new Book(bookData);
    const savedBook = await book.save();

    expect(savedBook._id).toBeDefined();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.author).toBe(bookData.author);
    expect(savedBook.year).toBe(bookData.year);
    expect(savedBook.genre).toBe(bookData.genre);
  });

  it('should fail to create a book without required fields', async () => {
    const book = new Book({ title: 'Missing Fields' });
    await expect(book.save()).rejects.toThrow();
  });

  // Mocking test
  it('should mock book creation', async () => {
    jest.spyOn(Book.prototype, 'save').mockImplementationOnce(() => ({
      _id: 'mocked_id',
      title: 'Mocked Book',
      author: 'Mocked Author',
      year: 2021,
      genre: 'Mocked Genre'
    }));

    const book = new Book({
      title: 'Mocked Book',
      author: 'Mocked Author',
      year: 2021,
      genre: 'Mocked Genre'
    });
    const savedBook = await book.save();

    expect(savedBook._id).toBe('mocked_id');
    expect(savedBook.title).toBe('Mocked Book');
    expect(Book.prototype.save).toHaveBeenCalled();
  });
});