const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isPremiumUser: {
    type: Boolean,
    required: true,
    default: false
  },
  totalExpenses: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   username: Sequelize.STRING,
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//   },
//   isPremiumUser: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   },
//   totalExpenses: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0
//   }
// });

// module.exports = User;
