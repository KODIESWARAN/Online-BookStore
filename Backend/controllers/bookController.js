const Book = require('../models/bookmodel')
const { Op } = require('sequelize');

exports.getAllBooks = async(req,res) => {
    try {
        const{title , author , minPrice , maxPrice,category} = req.query;

        const whereClause ={}

        if(title) whereClause.title = {[Op.like] : `%${title}%`}
        if(author) whereClause.author = {[Op.like] : `%${author}%`}
        if(category) whereClause.category = {[Op.like] : `%${category}%`}
        if(minPrice || maxPrice) {
            whereClause.price = {}
            if(minPrice) whereClause.price[Op.gte] = parseFloat(minPrice)
            if(maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice)
        }

        const books = await Book.findAll({where : whereClause})
        res.json(books)
    } catch (error) {
        res.status(500).json({message :"Error fetching books",error : error.message})
    }
}


exports.getBookById = async(req,res) =>{
    try {
        const book = await Book.findByPk(req.params.id)
        if(!book)  return res.status(404).json({message : "Book not found"})
        res.json(book) 
    } catch (error) {
        res.status(500).json({message :"Error fetching books",error : error.message})
    }
}

exports.createBook = async(req,res) =>{
  try {
    const {title,author , price,stock, description , category } = req.body;
    const imageURL = req.file ? `http://localhost:8000/uploads/${req.file.filename}` : null;
    const newBook = await Book.create({title,author,description,price,stock,category,imageURL})
    res.status(200).json(newBook)
    
  } catch (error) {
    res.status(500).json({message :"Error Creating books",error : error.message})
  }
}

exports.updateBook = async(req,res) => {
    try {
        const book = await Book.findByPk(req.params.id)
        if(!book) return res.status(404).json({message : "Book not found"})

        const{title,author,description ,price,stock,category} = req.body;

        let imageURL = book.imageURL
        if(req.file) {
            imageURL = `http://localhost:8000/uploads/${req.file.filename}`
        }


        await book.update({title,author,description,price,stock,category,imageURL})
        res.json({message : "updated successfully"})
    } catch (error) {
        
        res.status(500).json({message :"Error Updating books",error : error.message})
    }
}

exports.deleteBook = async(req,res) =>{
    try {
        const book = await Book.findByPk(req.params.id)
        if(!book) return res.status(404).json({message : "Book not found"})

        await book.destroy();
        res.json({message : "deleted successfully"})
    } catch (error) {
        res.status(500).json({message :"Error deleting books",error : error.message})
        
    }
}