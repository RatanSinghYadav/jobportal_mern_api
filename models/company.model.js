const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    description: {
        type: String,
        trim: true,
        default: null
    },
    website: {
        type: String,
        trim: true,
        default: null
    },
    location: {
        type: String,
        trim: true,
        default: null
    },
    logo: {
        type: String, // url to company logo
        default: null,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

},
    {
        timestamps: true
    }
)

const companys = mongoose.model('company', companySchema);

module.exports = companys;