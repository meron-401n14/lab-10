'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// == INTERNAL RESOURCES ===============================================

const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./routes/auth-router.js');
const bookRouter = require('./routes/book-router.js');
const app = express();

// == APPLICATION MIDDLEWARE ============================================

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// == ROUTES ===========================================================

/**
 * @route GET /
 * @returns {path} 200 - returns homepage path for this app
 */
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// set up middleware for auth-router path,
//and it will add to Express middleware stack
app.use(authRouter);

// set up middleware for book-router path,
//and it will add to Express middleware stack
app.use(bookRouter);

// set up middleware for 404 path,
//and it will add to the Express middleware stack
app.use(notFound);

// set up middleware for error path,
//and it will add to the Express middleware stack
app.use(errorHandler);

// == EXPORTS ===========================================================

module.exports = {
  server: app,

  start: port => {
    const PORT = port || process.env.PORT || 3000;

    // listens on port for connections,and print the port

    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });

    // current URl string parser is deprecated,and will be removed in future version to use
    //the new parser , pass those options
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    };

    const path = process.env.MONGODB_URI 
    //|| 'mongodb+srv://meron123:meron123@cfcluster-kexaa.mongodb.net/app?retryWrites=true&w=majority';
    mongoose.connect(path, options);
  }
};
