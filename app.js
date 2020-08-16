const express = require('express');
// const mongoose = require('mongoose');
// if (process.env.ENV === 'Test') {
//     console.log('This is test');
//     const db = mongoose.connect('mongodb://localhost/TestBookApi', { useNewUrlParser: true });
// }
// else {
//     console.log('This is dev');
//     const db = mongoose.connect('mongodb://localhost/DevBookApi', { useNewUrlParser: true });
// }
// const Book = require('./models/bookModel');
// const bookRouter = require('./routes/bookRouter')(Book);
const googleTechGuideRouter = require('./routes/googleTechGuideRouter')();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api', bookRouter);
app.use('/api', googleTechGuideRouter);

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = app;
