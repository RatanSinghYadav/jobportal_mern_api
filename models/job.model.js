const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: null
    },
    requirements: [{ type: String }],
    salary: { type: Number, default: null, trim: true },
    location: { type: String, default: null, trim: true },
    jobType: { type: String, default: null, trim: true },
    position: { type: Number, default: null, trim: true },
    experience: { type: String, default: null, trim: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'application'
        }
    ]
},
    {
        timestamps: true
    }
)

const jobs = mongoose.model('jobs', jobSchema);

module.exports = jobs;