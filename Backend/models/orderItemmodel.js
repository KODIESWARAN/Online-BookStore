const {DataTypes} = require('sequelize')
const sequelize = require('../config/db-config')

const OrderItem = sequelize.define('OrderItem' , {
    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    price  : {
        type :DataTypes.FLOAT,
        allowNull :false
    }
}, {
    timestamps : true
})

module.exports  = OrderItem