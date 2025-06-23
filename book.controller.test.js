const Book = require('../../models/book');
const { app } = require('../../server');

jest.mock('../../models/book');

describe('Book Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all books', async () => {
    const mockBooks = [
      { _id: '1', title: 'Book 1', author: 'Author 1', year: 2020, genre: 'Fiction' }
    ];
    Book.find.mockResolvedValue(mockBooks);

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await app._router.stack.find(route => route.path === '/api/books' && route.methods.get).handle(req, res);

    expect(Book.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  it('should create a book', async () => {
    const mockBook = {
      _id: '1',
      title: 'New Book',
      author: 'New Author',
      year: 2021,
      genre: 'Fiction'
    };
    Book.prototype.save = jest.fn().mockResolvedValue(mockBook);

    const req = {
      body: { title: 'New Book', author: 'New Author', year: 2021, genre: 'Fiction' }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await app._router.stack.find(route => route.path === '/api/books' && route.methods.post).handle(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });
});