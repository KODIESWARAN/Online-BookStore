const {DataTypes} = require('sequelize')
const sequelize = require('../config/db-config')


const Book = sequelize.define('Book' , {
    title : {
        type : DataTypes.STRING,
        allowNull :false
    },
    author : {
        type : DataTypes.STRING,
        allowNull: false
    },
    price : {
        type : DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
          }
    },
    stock : {
        type : DataTypes.INTEGER,
        defaultValue : 0,
        validate: {
            min: 0
          }
    },
    description  : {
        type : DataTypes.TEXT
    },
    category : {
        type : DataTypes.STRING
    },
    imageURL : {
        type : DataTypes.STRING,
        allowNull :false
    }
}, {
    timestamps : true
})


module.exports = Book