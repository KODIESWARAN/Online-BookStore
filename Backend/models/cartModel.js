// models/cartModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const User = require('../models/usermodel');

const Cart = sequelize.define('Cart', {
  // Can be extended if needed
  totalAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
},
 {
    timestamps : true
 });

Cart.belongsTo(User);
User.hasOne(Cart);

module.exports = Cart;
