const User = require("../models/User")
const Provider = require("../models/Provider")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

const getUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    // Send the users back in the response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const addUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create a new user instance
    const user = await User.create({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      role: userData.role // Assuming you have a role field in your user model
    });

    const users = await User.find();

    res.status(201).json( users );
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 
    // Assuming you're passing the user ID in the URL parameter
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Provider.deleteMany({ user: userId });
    // If the user exists, delete it from the database
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // Retrieve the user ID from URL parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user information
    await User.findByIdAndUpdate(userId, updatedData, { new: true });

    const users = await User.find();

    res.status(200).json( users );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const updateProfilePic = async (req, res) => {
  const profilePic = req.body.profilePic;
  console.log(req.body.profilePic)
  const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: 'Unauthorized access' });
          } else {
            try {
              const user = await User.findByIdAndUpdate(
                decodedToken.userId,
                { profilePic },
                { new: true } // Return the updated user document
              );
              
              console.log(user)
              res.status(200).json({user})
            } catch (dbError) {
              console.error('Error fetching user from database:', dbError);
              res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
            }
          }
        });
    } else {
        res.status(401).json({ redirect: '/', message: 'No token provided' });
    }
}

const fetchUser = async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
          if (err) {
            res.status(401).json({ message: 'Unauthorized access' });
          } else {
            try {
              let user = await User.findById(decodedToken.userId);
              res.status(200).json({user})
            } catch (dbError) {
              console.error('Error fetching user from database:', dbError);
              res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
            }
          }
        });
    } else {
        res.status(401).json({ redirect: '/', message: 'No token provided' });
    }
}

const modifUser = async (req, res) => {
  try {
      const userData = req.body;
      const updateFields = {};

      if (userData.email !== undefined) {
          // Check if email is meant to be deleted or updated
          if (userData.email === '') {
              updateFields.email = null; // or remove the field completely
          } else {
              const existingUser = await User.findOne({ email: userData.email });
              if (existingUser && existingUser._id.toString() !== userData.userid) {
                  return res.status(400).json({ message: 'Adresse email existe déjà' });
              }
              updateFields.email = userData.email;
          }
      }

      if (userData.password !== undefined) {
          // Check if password is meant to be deleted or updated
          if (userData.password === '') {
              updateFields.password = null; // or remove the field completely
          } else {
              const salt = await bcrypt.genSalt();
              const hashed = await bcrypt.hash(userData.password, salt);
              updateFields.password = hashed;
          }
      }

      if (userData.username !== undefined) {
          updateFields.username = userData.username === '' ? null : userData.username;
      }
      if (userData.phone !== undefined) {
          updateFields.phone = userData.phone === '' ? null : userData.phone;
      }
      if (userData.profilePic !== undefined) {
          updateFields.profilePic = userData.profilePic === '' ? null : userData.profilePic;
      }

      const user = await User.findByIdAndUpdate(
          userData.userid,
          { $set: updateFields },
          { new: true }
      );

      res.status(200).json({ user: user._id, message: 'Informations modifiées avec succès' });
  } catch (error) {
      res.status(500).json({ message: 'Erreur de modification utilisateur' });
  }
};

const linkSocialMediaAccount = async (req, res) => {
  const token = req.cookies.jwt
  const userCredential = req.body;
  const providerName = userCredential._tokenResponse.providerId
  const accessToken = userCredential._tokenResponse.oauthAccessToken
  const tokenSecret = userCredential._tokenResponse.oauthTokenSecret
  const federatedId = userCredential._tokenResponse.federatedId
  const providerId = federatedId.split('/').pop();
  try {
    if (!providerName) {
      return res.status(400).json({ error: 'Invalid request data' });
    }
    jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized access' });
      } else {
        let user = await User.findById(decodedToken.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (providerName === 'facebook.com') {
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
        }else if (providerName === 'twitter.com') {
          const newProvider = await Provider.create({
            providerName,
            providerId,
            providerToken: accessToken,
            providerSecret: tokenSecret,
            user: user._id,
          });
          user.provider.push({
            _id: newProvider._id,
            providerName: newProvider.providerName 
          });
        }
        await user.save();
        res.cookie('X_access_token', accessToken, {
          httpOnly: false,
        });
        res.cookie('X_token_secret', tokenSecret, {
          httpOnly: false,
        });
      res.status(200).json({ message: 'Account linked successfully' });
      }
    });  
  } catch (error) {
      console.error('Error linking account:', error);
      res.status(500).json({ error: 'Failed to link account' });
  }
};

module.exports = {
    getUsers,
    addUser,
    deleteUser,
    updateUser,
    fetchUser,
    modifUser,
    updateProfilePic,
    linkSocialMediaAccount
}