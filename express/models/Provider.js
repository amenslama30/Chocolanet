const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    providerName: {
        type: String,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
    providerToken: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true,
    },
});

const Provider = mongoose.model('provider', providerSchema);
module.exports = Provider;