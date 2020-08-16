/**
 * BooksController
 * @param { Schema } Book
 * @return { any } functions*/
function booksController(Book) {
    /**
     * Routers for books
     * @param { any } req
     * @param { any } res
     * @return { any } book*/
    function post(req, res) {
        const book = new Book(req.body);
        if(!req.body.title) {
            res.status(400);
            return res.send('Title is required');
        }
        book.save();
        res.status(201);
        return res.json(book);
    }
    /**
     * Routers for books
     * @param { any } req
     * @param { any } res */
    function get(req, res) {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            const toReturn = books.map((book) => {
                const newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
                return newBook;
            });
            return res.json(toReturn);
        });
    }

    return { post, get };
}

module.exports = booksController;
