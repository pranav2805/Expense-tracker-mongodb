const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
  id:{
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
  }
})

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Forgotpassword = sequelize.define('forgotpassword', {
//   id: {
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true
//   },
//   userId: Sequelize.INTEGER,
//   isActive: Sequelize.BOOLEAN
// });

// module.exports = Forgotpassword;
