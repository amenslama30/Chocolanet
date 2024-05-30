const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    username : {
        type : String,
    }, 
    email :  {
        type : String ,
        unique: true,
        lowercase : true
    }, 
    phone : {
        type : String,
    },
    password : {
        type : String,
    },
    profilePic : {
        type : String,
        default : 'https://cdn-icons-png.freepik.com/512/10302/10302971.png'
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Define allowed roles (optional)
        default: 'user', // Set a default role if not provided
    },
    provider: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider'
        },
        providerName: String
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})


const User = mongoose.model("users" , userSchema)
module.exports = User