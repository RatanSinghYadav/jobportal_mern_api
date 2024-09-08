const Company = require('../models/company.model.js');

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            res.status(400).json({ success: false, message: 'company name is required' });
            return;
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            res.status(400).json({ success: false, message: 'company is already register.' });
            return;
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        res.status(201).json({ success: true, message: 'Company created successfuly.', company })

    } catch (error) {
        console.error('Error in from company creation:', error);
        res.status(500).json({ error: 'Error in from company creation:', success: false });
    }
}

const getAllCompany = async (req, res) => {
    try {
        const id = req.id;

        const company = await Company.find({ id: id });
        if (!company) {
            res.status(404).json({ success: false, message: 'company data is not found', company })
        }

        res.status(201).json({ success: true, message: 'company data found.', company });
    } catch (error) {
        console.error('Error in from get company data:', error);
        res.status(500).json({ error: 'Error in from get company data', success: false });
    }
}

const getCompanyById = async (req, res) => {
    try {
        const id = req.params.id;

        const company = await Company.findById({ id: id });
        if (!company) {
            res.status(404).json({ success: false, message: 'company data is not found', company })
        }

        res.status(201).json({ success: true, message: 'company data found.', company });
    } catch (error) {
        console.error('Error in from get company data:', error);
        res.status(500).json({ error: 'Error in from get company data', success: false });
    }
}


const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const id = req.params.id;

        const updateData = await Company.findByIdAndUpdate(id, {
            name: name,
            website: website,
            description: description,
            location: location
        },
            { new: true }
        )
        if (!updateData) {
            res.status(500).json({ error: 'company data is not updated', success: false });
            return
        }

        res.status(201).json({ success: true, message: 'company data updated successfuly.' });

    } catch (error) {
        console.error('Error in from get company data:', error);
        res.status(500).json({ error: 'Error in from get company data', success: false });
    }
}



module.exports = {registerCompany, getAllCompany, getCompanyById, updateCompany};