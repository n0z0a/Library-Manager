const uri = 
'temp';

const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
// Middleware for handling CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
async function connectToMongo(){
    try{
        await client.connect();
        console.log('Connected to MongoDB');
    } catch(error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}
connectToMongo();
const databaseName = 'Capstone_Project';
const collectionName = 'libraryBooks';
const database = client.db(databaseName);
const collection = database.collection(collectionName);

// GET all books, or get all avail books or get all unavail books
app.get('/books/:status?', async (req, res) => {
    try {
    const { status } = req.params;
    let query = {};

    if (status !== undefined) {
      const isAvailable = status === 'true';
      query = { status: isAvailable };
    }

    const books = await collection.find(query).toArray();
    const bookList = books.map(({ _id, title, status }) => ({ id: _id.toString(), title, status }));
    res.json(bookList);
  } catch (error) {
    console.error('Error fetching books', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//Get Book by Title
app.get('/books/title/:title', async (req, res) => {
  try {
    const bookTitle = req.params.title;

    // Check if the book exists
    const book = await collection.findOne({ title: bookTitle });

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    // Display all values of the book
    res.json({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      ISBN: book.ISBN,
      status: book.status,
      checkedOutBy: book.checkedOutBy,
      dueDate: book.dueDate,
    });
  } catch (error) {
    console.error('Error fetching book by title', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.use(express.json());
app.put('/books/:title', async (req, res) => {
  try {
    const bookTitle = req.params.title;
    const updateFields = req.body;

    // Check if the book exists
    const existingBook = await collection.findOne({ title: bookTitle });
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    // Update the book with the provided fields
    const updatedBook = await collection.findOneAndUpdate(
      { title: bookTitle },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!updatedBook.value) {
      return res.status(500).json({ error: 'Failed to update book.' });
    }

    const { _id, title, status, checkedOutBy, dueDate } = updatedBook.value;

    // Respond with the updated book details and success message
    res.json({
      id: _id.toString(),
      title,
      status,
      checkedOutBy,
      dueDate,
      message: 'Book updated successfully.',
    });
  } catch (error) {
    console.error('Error updating book', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


process.on('SIGNT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});