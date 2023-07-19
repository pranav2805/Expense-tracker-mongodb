// const Sib = require('sib-api-v3-sdk');
const Sib = require('@getbrevo/brevo');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');

exports.postSendEmail = async (req, res) => {
    try{
        const sender = {
            email: 'pranavpradeep095@gmail.com'
        }
        
        const { email } = req.body;

        const user = await User.findOne({email: email});
        if(user){
            const id = uuid.v4();
            // await user.createForgotpassword({id, isActive: true});
            const forgotPassword = new Forgotpassword({id: id, userId: user._id, isActive: true})
            forgotPassword.save();
            console.log(email);
            await tranEmailApi.sendTransacEmail({
                sender,
                to: email,
                subject: 'Reset Password Link',
                htmlContent: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset Password</a>`
            })
    
            res.status(200).json({success: true, message: 'Link to reset password sent to your mail'});
        } else{
            throw new Error('User email id not registered!!')
        }

        
    } catch(err){
        console.log(err);
        res.status(500).json({success: false, message:err});
    }
}


exports.resetPassword = async (req, res) => {
    try{
    const id = req.params.id;
    const forgotpasswordRequest = await Forgotpassword.findOne({id: id, isActive: true});
    await Forgotpassword.updateOne({id: id}, {isActive: false})

    if(forgotpasswordRequest){
        res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
        res.end();
    } else{
        throw new Error('Reset password link not found or expired!!');
    }

    } catch(err){
        console.log(err);
        res.status(500).json({success: false, message:err});
    }
}

exports.updatePassword = async (req, res) => {
    try{
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        const forgotpasswordRequest = await Forgotpassword.findOne({ id: resetpasswordid })
        if(forgotpasswordRequest){
            const user = await User.findOne({id: forgotpasswordRequest.userId});
            if(user){
                const saltRounds = 10;
                bcrypt.hash(newpassword, saltRounds, async (err, hash) => {
                if(err){
                    console.log(err);
                    res.status(500).json({success: false, message:err});
                } else{
                    // await user.update({password: hash});
                    await User.updateOne({_id: user._id}, {password: hash})
                    res.status(200).send(`<html>
                                            window.alert('Successfully updated with new password!!')
                                          </html>`
                                        );
                    res.end();
                }

                })
            }
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message:err});
    }
}
