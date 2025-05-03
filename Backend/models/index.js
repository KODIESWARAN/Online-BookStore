const sequelize = require('../config/db-config');
const User = require('../models/usermodel');
const Book = require('../models/bookmodel');
const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemmodel');
const Order = require('../models/ordermodel');
const OrderItem = require('../models/orderItemmodel');

// Associations
User.hasMany(Order);
Order.belongsTo(User,{foreignKey : 'UserId' ,as :'User' });

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Book.hasMany(CartItem);
CartItem.belongsTo(Book);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Book.hasMany(OrderItem);
OrderItem.belongsTo(Book);

module.exports = {
  sequelize,
  User,
  Book,
  Cart,
  CartItem,
  Order,
  OrderItem
};
