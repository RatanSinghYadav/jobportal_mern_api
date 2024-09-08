const { Router } = require('express');
const route = Router();
const { register, login, logout, updateProfile } = require('../controllers/user.controller.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');
const { registerCompany, getAllCompany, getCompanyById, updateCompany } = require('../controllers/company.controller.js');
const { jobPost, getAllJobs, getJobById, getAdminJobs } = require('../controllers/job.controller.js');

// user api
route.post('/api/v1/user/signup', register);
route.post('/api/v1/user/login', login);
route.get('/api/v1/user/logout', logout);
route.post('/api/v1/user/profile/update', isAuthenticated, updateProfile);

// company api
route.post('/api/v1/company/registerCompany', isAuthenticated, registerCompany);
route.get('/api/v1/company/getAllCompany', isAuthenticated, getAllCompany);
route.get('/api/v1/company/getCompanyById/:id', isAuthenticated, getCompanyById);
route.post('/api/v1/company/updateCompany/:id', isAuthenticated, updateCompany);
route.post('/api/v1/job/jobpost', isAuthenticated, jobPost);
route.get('/api/v1/job/getAllJobs', isAuthenticated, getAllJobs);
route.get('/api/v1/job/getJobById/:id', isAuthenticated, getJobById);
route.get('/api/v1/job/getAdminJobs/:id', isAuthenticated, getAdminJobs)

module.exports = route;