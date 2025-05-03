const {DataTypes} = require('sequelize')
const sequelize = require('../config/db-config')

const Order = sequelize.define('Order' , {
    totalAmount  : {
        type : DataTypes.FLOAT,
        allowNull :false
    },
    status : {
        type : DataTypes.STRING,
        defaultValue : 'processing',
        validate: {
            isIn: [['processing', 'shipped', 'delivered', 'cancelled']]
      }

    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
}, {
    timestamps : true
});


module.exports = Order