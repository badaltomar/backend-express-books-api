const { initializedDatabase } = require('./db/db.connect')
const Book = require('./models/books.models')
const express = require('express')
const app = express()
app.use(express.json())
const PORT = 3000
require('dotenv').config()

const cors = require('cors')
app.use(cors())

initializedDatabase()

app.get('/books', async (req, res) => {
    try {
        const getAllBooks = await Book.find()
        if(getAllBooks.length > 0){
            res.status(200).json(getAllBooks)
        }else{
            res.status(404).json({error: 'No Books Available.', data: []})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch books data!' , error: error.message})
    }
})


app.post('/books', async (req, res) => {
    try {
        const addNewBook = new Book(req.body)
        const savedNewBook = await addNewBook.save()

        res.status(201).json({message: 'Book added into database successfully.', newBook: savedNewBook})        
        
    } catch (error) {
        res.status(500).json({message: 'Failed to add new book into database!', error:error.message})
    }
})


app.get('/books/:bookTitle', async (req, res) => {
    try {
        const getByTitle = await Book.findOne( {title: req.params.bookTitle})
        if(getByTitle){
            res.status(200).json(getByTitle)        
        }else{
            res.status(404).json({error: 'No book found of this title.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch books data!' , error: error.message})
    }
})


app.get('/books/authors/:authorName', async(req, res) =>{
    try {
        const getByAuthor = await Book.find({author: req.params.authorName})
        if(getByAuthor.length > 0){
            res.status(200).json(getByAuthor)        
        }else{
            res.status(404).json({error: 'No book found of this author.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch books data!' , error: error.message})
    }
})


app.get('/books/genres/:genreName', async(req, res) =>{
    try {
        const getByGenre = await Book.find({genre: req.params.genreName})
        if(getByGenre.length > 0){
            res.status(200).json(getByGenre)        
        }else{
            res.status(404).json({error: 'No book found of this genre.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch books data!' , error: error.message})
    }
})

app.get('/books/year/:publishedYear', async(req, res) =>{
    try {
        const getByYear = await Book.find({publishedYear: req.params.publishedYear})
        if(getByYear.length > 0){
            res.status(200).json(getByYear)        
        }else{
            res.status(404).json({error: 'No book found from this published year.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch books data!' , error: error.message})
    }
})


app.post('/books/:bookId', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {new: true})

        if(updatedBook){
            res.status(200).json({message: 'Book updated successfully.', updatedBook: updatedBook})
        }else{
            res.status(404).json({error: 'Book does not exist.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to update book data!' , error: error.message})
    }
})

app.post('/books/title/:bookTitle', async (req, res) => {
    try {
        const updateByTitle = await Book.findOneAndUpdate({title: req.params.bookTitle}, req.body, {new: true})
        if(updateByTitle){
            res.status(200).json({message: 'Book updated successfully by title.', updatedBook: updateByTitle})
        }else{
            res.status(404).json({error: 'Book does not exist.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to update book data by title!' , error: error.message})
    }
})


app.delete('/books/:bookId', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId)
        if(deletedBook){
            res.status(200).json({message: 'Book deleted successfully from the database.', deletedBook: deletedBook})
        }else{
            res.status(404).json({error: 'Book does not exist.'})
        }
    } catch (error) {
        res.status(500).json({message: 'Failed to delete book from the database!' , error: error.message})
    }
})

// ---- ---- ---- 
// PORT:
// ---- ---- ---- 

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
    
})