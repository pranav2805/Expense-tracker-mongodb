const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const https = require('https');
const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config();

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/order');
const Forgotpassword = require('./models/forgotpassword');
const DownloadedFile = require('./models/downloadedfile');

const app = express();
app.use(cors({
    origin: '*'
}));

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a'}
);

app.use(morgan('combined', { stream: accessLogStream}));

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);

// User.hasMany(DownloadedFile);
// DownloadedFile.belongsTo(User);

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user');
const expRoutes = require('./routes/expRoute');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const resetpasswordRoutes = require('./routes/resetpassword');

app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use(userRoutes);
app.use(expRoutes);
app.use('/password', resetpasswordRoutes);

//app.use(errorController.get404);
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, `public/${req.url}`));
// })

mongoose.connect('mongodb+srv://pranavpradeep095:Vsr2PfxTCUsNKGTN@cluster0.uqrnxyd.mongodb.net/expensetracker?retryWrites=true&w=majority')
.then(result => {
  console.log('Connected!');
  app.listen(3000);
})
.catch(err => console.log(err))