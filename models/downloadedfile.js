const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadedFileSchema = new Schema({
  Url: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('DownloadedFile', downloadedFileSchema);

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const DownloadedFile = sequelize.define('downloadedFile', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   URL: Sequelize.STRING
// });

// module.exports = DownloadedFile;