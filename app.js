require('dotenv').config()
const connectDB =  require('./utils/db/connect.js')
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const route = require('./routes/router.js');
const Port =  8000 || process.env.PORT

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:`http//localhost:3000`,
    credentials:true
} 

app.use(cors(corsOptions));
app.use(route);

connectDB();
app.listen(8000, () => {
    console.log(`server is running on port ${Port}`)
})