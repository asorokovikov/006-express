const express = require('express');
const router = express.Router();
const path = require('path');
const fileMiddleware = require('../../middleware/file');
const { Book } = require('../../models');

const store = {
  books: [
    new Book(`Book #1`),
    new Book(`Book #2`),
    new Book(`Book #3`)
  ]
}

// GET /api/books
router.get('/', (req, res) => {
  res.status(200);
  res.json(store.books);
});

// GET /api/books/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex(x => x.id === id);
  if (index === -1) {
    res.status(404);
    res.json('Not found');
    return;
  }
  res.status(200);
  res.json(store.books[index]);
});

// POST /api/books
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    throw new Error('\'title\' field is required')
  }
  if (!description) {
    throw new Error('\'description\' field is required')
  }
    const book = new Book(title, description);
    store.books.push(book);

    res.status(200);
    res.json(book);
});

// PUT /api/books/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const index = store.books.findIndex(x => x.id === id);
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  store.books[index] = { ...store.books[index], title, description };
  res.json(store.books[index]);
});

// DELETE /api/books/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  store.books = store.books.filter(x => x.id !== id);
  res.sendStatus(200);
});

// UPLOAD
router.post('/:id/upload', fileMiddleware.single('file'), (req, res) => {
  if (req.file) {
    const { id } = req.params;
    const { path, originalname } = req.file;
    const index = store.books.findIndex(x => x.id === id);
    if (index === -1) {
      res.sendStatus(404);
      return;
    }
    const item = store.books[index];
    item.fileName = originalname;
    item.fileBook = path;
    res.json(path);
  } else {
    res.json(null);
  }
});

// DOWNLOAD
router.get('/:id/download', (req, res) => {
  const { id } = req.params;
  const index = store.books.findIndex(x => x.id === id);
  if (index === -1) {
    res.sendStatus(404);
    return;
  }
  const item = store.books[index];

  const bookPath = path.join(__dirname, '..', item.fileBook);
  console.log(bookPath);
  res.download(bookPath, item.fileName, err => {
    if (err)
      res.status(404).json();
  })
});


// POST /api/user/login

// router.post('/api/user/login', (req, res) => {
//   res.status(201);
//   res.json({ id: 1, mail: "test@mail.ru" });
// });

module.exports = router;
