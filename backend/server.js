const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const cors = require('cors');
require('dotenv').config(); // henter miljøvariabel

const MyBooks = require('./models/my_books'); // henter bogskema

const app = express(); // app express

app.use(cors()); // middlewere funktion
app.use(express.json()); // middelwere

// forbinder til mongodb
mongoose.connect(process.env.URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// viser endpoint my-books og bøger

app.get('/my-books', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const searchTerm = req.query.search || "";

    // finder bøger efter hvad der er søgt efter

    const query = searchTerm ? { title: { $regex: searchTerm, $options: 'i' } } : {};

    const total = await MyBooks.countDocuments(query); // viser bøger der passer
    const books = await MyBooks.find(query) // viser bøger der passer
    // limit til søgningen
      .skip((page - 1) * limit)
      .limit(limit);

      // udregner antal af sider der passer søgning limit sætter antal på siden

    const totalPages = Math.ceil(total / limit);

    res.json({ books, totalPages, currentPage: page }); // json svar
  } catch (err) {
    res.status(500).json({ message: err.message }); // fejlbesked
  }
});

// laver et post på endpoint my-books efter requst fra body gemmer den eller viser fejlbesked 
app.post('/my-books', async (req, res) => {
  try {
    const book = new MyBooks(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// opdater en bog efter id på my books 

app.put('/my-books/:id', async (req, res) => {
  try {
    const updated = await MyBooks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleter en bog efter id

app.delete('/my-books/:id', async (req, res) => {
  try {
    const deleted = await MyBooks.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Bogen er blevet slettet' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));