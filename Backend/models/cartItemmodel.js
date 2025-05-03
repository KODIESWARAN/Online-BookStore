
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');

const CartItem = sequelize.define('CartItem', {
    quantity: { 
        type: DataTypes.INTEGER, 
        defaultValue: 1,
        validate: {
            min: 1,
      }}
  }, {
    timestamp : true
  });

module.exports = CartItem