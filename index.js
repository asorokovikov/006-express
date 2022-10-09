const express = require('express');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');

const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');

const app = express();

app.use(loggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));
app.use('/api/books', bookApiRouter);
app.use('/', indexRouter);

app.use(errorMiddleware);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    error: err.message,
  })
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
