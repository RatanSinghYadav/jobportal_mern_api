const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        default: null,
        unique: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: null,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        default: null
    },
    role: {
        type: String,
        enum: ['student', 'recruiter', 'admin'],
        default: 'student'
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // url to resume file
        resumeOriginalName: { type: String },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company', 
        },
        profilePhoto: { type: String, default: null }
    }
},
    {
        timestamps: true
    }
)

const users = new mongoose.model('users', userSchema)

module.exports = users;