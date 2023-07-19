const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderboard = async (req, res) => {
    try{

        // const leaderboardOfUsers = await User.find({
        //     attributes: ['username', 'totalExpenses'],
        //     order: [['totalExpenses', 'DESC']]
        // })

        const leaderboardOfUsers = await User.find().sort({ totalExpenses: -1})

        res.status(200).json(leaderboardOfUsers);
    } catch(err) {
        console.log(err);
        res.status(403).json({message: 'Something went wrong!!'})
    }
}