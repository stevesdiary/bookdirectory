const router = require('express').Router();
const books = require('./books_library');

const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://demo:Password@cluster0.kcjp1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let booksDirectory = books;

router.get('/books', (req, res)=> {
   res.send(booksDirectory)

});
router.get('/books/:id', (req, res)=> {
   const { id } = req.params;

   const book = booksDirectory.find(b => b.isbn === id);
   if (!book) return res.status(404).send('Book does not exist');

   res.send(book);
});

router.post('/books', (req, res)=> {
   const {
      isbn,
      title,
      pageCount,
      author,
      status,
      categories,
      format
   }= req.body;

   const bookExist = booksDirectory.find(b => b.isbn === isbn);
   if (bookExist) return res.send('Book already exists');

   const book = {
      isbn,
      title,
      pageCount,
      author,
      status,
      categories,
      format
   };
   booksDirectory.push(book);

   res.send(book);

});

router.put('/books/:id', (req, res)=> {
const { id } = req.params;
const {
   title,
   pageCount,
   author,
   status,
   categories,
   format
} = req.body;
const book = booksDirectory.find(b => b.isbn === id);
if (!book) return res.send('Book does not exist');

const updateField = (val, prev) => !val ? prev : val;

const updatedBook = {

   ...book,
   title: updateField(title, book.title),
   pageCount: updateField(pageCount, book.pageCount),
   author: updateField(author, book.author),
   status: updateField(status, book.status),
   categories: updateField(categories, book.categories),
   format: updateField(format, book.format),
   };
   const bookIndex = booksDirectory.findIndex(b => b.isbn === id);
   booksDirectory.splice(bookIndex, 1, updatedBook);

   res.send(updatedBook);

   console.log(updatedBook)
});


router.delete('/books/:id', (req, res)=> {
   const { id } = req.params;

   let book = booksDirectory.find(b => b.isbn === id);
   if (!book) return res.status(404).send("Book does not exist");

   booksDirectory = booksDirectory.filter(b => b.isbn !==id);

   res.send("Success");

});

module.exports = router;