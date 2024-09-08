const Application = require("../models/application.model");
const Job = require("../models/job.model");

const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            res.status(400).json({ success: false, message: 'Job is required' });
            return;
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (!existingApplication) {
            res.status(404).json({ success: false, message: 'You have already applied for this job' });
            return;
        }

        const job = await Job.findById(jobId);

        if (!job) {
            res.status(404).json({ success: false, message: 'Job not found' });
            return
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        const appliedJob = await job.save();

        res.status(201).json({ success: true, message: 'job applied successfuly', appliedJob });

    } catch (error) {
        console.log(error);
    }
}

const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: job,
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!application) {
            res.status(404).json({ success: false, message: 'Application not found' });
            return
        }

        res.status(200).json({ success: true, message: 'application found', application });
    } catch (error) {
        console.log(error);
    }
}

const getApplicants = async(req, res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'application',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            res.status(404).json({success:false, message:'Job not Found.'});
            return
        }

        res.status(201).json({success:true, message:"job found.", job})
    } catch (error) {
        console.log(error);
    }
}

