const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {sequelize} = require('./models')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')



app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/cart' , cartRoutes)
app.use('/api/order' ,orderRoutes)




sequelize.sync()
.then(() =>{
    console.log("Database Connected")
})
.catch ((err) => {
    console.log("There is an issue in Database",err)
})
const PORT = process.env.PORT || 5000 
app.listen(PORT , () => {
    console.log(`Listening to the port ${PORT}`)
})