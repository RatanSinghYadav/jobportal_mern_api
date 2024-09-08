const Job = require("../models/job.model.js");

const jobPost = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            res.status(404).json({ success: false, message: 'few job field is missing.' });
            return;
        }

        const job = await Job.create({
            title: title,
            description: description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location: location,
            jobType: jobType,
            experience: experience,
            position: position,
            company: companyId,
            createdBy: userId
        })

        const jobCreated = await job.save();

        res.status(201).json({ success: true, message: 'job created successfully.', jobCreated })
    } catch (error) {
        console.log(error)
    }
}

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        };

        const jobs = await Job.find(query).populate({path:'company'}).sort({createdAt:-1});

        if (!jobs) {
            res.status(404).json({ success: false, message: 'job not found' });
            return
        }

        res.status(201).json({ success: true, message: "job found successuly.", jobs });
    } catch (error) {
        console.log(error);
    }
}

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: 'Jobs not found' });
        }

        return res.status(200).json({ success: true, message: 'job found successfuly.' });
    } catch (error) {
        console.log(error)
    }

}

const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId });

        if (!jobs) {
            res.status(404).json({ success: false, message: 'jobs not found' });
            return
        }

        res.status(200).json({ success: true, message: 'job found successfully' });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { jobPost, getAllJobs, getJobById, getAdminJobs };