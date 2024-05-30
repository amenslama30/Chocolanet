const User = require("../models/User")
const Provider = require("../models/Provider")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const axios = require('axios');

const signin = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Adresse email invalide" })
    }else {
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
        res.status(401).json({ message: 'Problème de mot de passe' });
        }else {
            const token = jwt.sign({ userId: user._id }, 'secret key amen');
            res.cookie('jwt',token , {
                httpOnly : false 
            })
            res.status(200).json({ redirect: '/dashboard' })
        }
    }
    } catch (error) {
    res.status(500).json(error)
    }
}

const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json({ message: 'Adresse email existe déjâ' })
        }else {
            const salt = await  bcrypt.genSalt()
            const hashed = await bcrypt.hash(password,salt)
            const user = await User.create({
                username, 
                email, 
                password : hashed,
            })
            const token = jwt.sign({ userId: user._id }, 'secret key amen');
            res.cookie('jwt',token , {
                httpOnly : false 
            })
            res.status(200).json({ user: user._id , redirect: '/dashboard' })
        }
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        res.status(500).json({ error: 'An error occurred during signup' }); // Generic error message for user
    }
}

const FBsignin = async (req, res) => {
    const userCredential = req.body; // Extract user data from request
    const email = userCredential.user.email
    const accessToken = userCredential._tokenResponse.oauthAccessToken
    const federatedId = userCredential._tokenResponse.federatedId
    const userId = federatedId.split('/').pop();
  try {
    let user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ message: "Utilisateur n'existe pas" })
    }else {
        const response = await axios.get(`https://graph.facebook.com/me?fields=id&access_token=${accessToken}`);
        if (response.data.id === userId) {
            const token = jwt.sign({ userId: user._id }, 'secret key amen');
            const provider = await Provider.findOneAndUpdate({ user: user._id }, { providerToken: accessToken }, { new: true });
                res.cookie('jwt', token, {
                httpOnly : false
                })
                res.cookie('fb_access_token', accessToken, {
                httpOnly: false,
                });
            res.status(200).json({ user: user._id , redirect:'/dashboard' }); //authorized access
        }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to connect' }); // Internal server error
  }
}

const FBsignup = async (req, res) => {
    const userCredential = req.body; // Extract user data from request
    const email = userCredential.user.email
    const username = userCredential.user.displayName
    const profilePic = userCredential.user.photoURL
    const providerName = userCredential.providerId
    const accessToken = userCredential._tokenResponse.oauthAccessToken
    const federatedId = userCredential._tokenResponse.federatedId
    const providerId = federatedId.split('/').pop();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        res.status(409).json({ status: 409, message: 'Utilisateur existe déjâ', redirect: '/login' }); // Conflict: User exists
        } else {
        const response = await axios.get(`https://graph.facebook.com/me?fields=id&access_token=${accessToken}`);
        if (response.data.id === providerId) {
            const user = await User.create({ 
                username, 
                email,
                profilePic,
            }); 
            const newProvider = await Provider.create({
                providerName,
                providerId,
                providerToken: accessToken,
                user: user._id,
            });

            user.provider.push({
                _id: newProvider._id,
                providerName: newProvider.providerName 
            });
            await user.save();

            const token = jwt.sign({ userId: user._id }, 'secret key amen');
            res.cookie('jwt', token, {
            httpOnly : false
            })
            res.cookie('fb_access_token', accessToken, {
                httpOnly: false,
                });
            res.status(200).json({ user: user._id , redirect:'/dashboard' }); // Respond with success and user data
        }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' }); // Internal server error
    }
}

const Xsignin = async (req, res) => {
    const userCredential = req.body; // Extract user data from request
    const email = userCredential.user.email
    const accessToken = userCredential._tokenResponse.oauthAccessToken
    const federatedId = userCredential._tokenResponse.federatedId
    const userId = federatedId.split('/').pop();
  try {
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({ error: "Utilisateur n'existe pas" })
    } else{
        const token = jwt.sign({ userId: user._id }, 'secret key amen');
            res.cookie('jwt', token, {
            httpOnly : true
            })
            res.cookie('X_access_token', accessToken, {
            httpOnly: false,
            });
        res.status(200).json({ user: user._id , redirect:'/main' }); //authorized access
    }
  }catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
        // Handle 404 error
        res.status(404).json({ message: 'Resource not found' });
    } else {
        // Handle other errors
        res.status(500).json({ message: 'Failed to connect' });
    }
  }
}

const Xsignup = async (req, res) => {
    const userCredential = req.body; // Extract user data from request
    const uid = userCredential.user.uid
    const email = userCredential.user.email
    const username = userCredential.user.displayName
    const profilePic = userCredential.user.photoURL
    const provider = userCredential.providerId
    const accessToken = userCredential._tokenResponse.oauthAccessToken
    const federatedId = userCredential._tokenResponse.federatedId
    const userId = federatedId.split('/').pop();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        res.json({ status: 409, message: 'User already exists', redirect: '/login' }); // Conflict: User exists
        } else {
            const user = await User.create({ 
                username, 
                email,
                profilePic,
                provider,
            }); 
            const token = jwt.sign({ userId: user._id }, 'secret key amen');
            res.cookie('jwt', token, {
            httpOnly : true
            })
            res.cookie('X_access_token', accessToken, {
            httpOnly: false,
            });
            res.status(200).json({ user: user._id , redirect:'/main' }); // Respond with success and user data
        
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' }); // Internal server error
    }
}


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'amenslama25@gmail.com', // Replace with your email account
        pass: 'srzk frem fici rvdd ',  // Replace with your email password
    },
    debug: true,
});

const recoverPassword = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();
        const resetURL = `https://localhost:8082/reset-password/${token}`;

        const mailOptions = {
            to: user.email,
            from: 'password-reset@yourdomain.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   ${resetURL}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Error sending email', error: err.message });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent' });
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }
        const salt = await  bcrypt.genSalt()
        const hashed = await bcrypt.hash(password,salt)
        user.password = hashed; // Hash the password in production
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


const signout = (req, res) => {
    try {
        // Get all cookies from the request
        const cookies = req.cookies;
        // Iterate over all cookies and set them to expire immediately
        for (const cookieName in cookies) {
            if (cookies.hasOwnProperty(cookieName)) {
                res.cookie(cookieName, '', { maxAge: 1 });
            }
        }
        // Respond with a redirect or success message
        res.status(200).json({ redirect: '/' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during signout' });
    }
};

module.exports = {
    signin,
    signup,
    FBsignin,
    FBsignup,
    Xsignin,
    Xsignup,
    recoverPassword,
    resetPassword,
    signout
}