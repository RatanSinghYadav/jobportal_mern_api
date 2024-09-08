const User  =  require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user register api


const register = async (req, res) => {
    
    try {
        const { fullName, email, phoneNumber, role, password } = req.body;
        
        if (!fullName || !email || !phoneNumber || !role || !password) {
            res.status(422).json({ success: false, message: "Wrong credentials" });
            return
        };
        
        // Check if user already exists
        const checkUser = await User.findOne({ email: email });

        if (checkUser) {
            res.status(422).json({ success: false, message: "This user is already present" });
        } else {
            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: hashedPassword,
                role: role,
            })

            const userData = await user.save();

            // Return token for future authentication
            const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);

            res.status(201).json({ success: true, message: "User is created", token, user });
        }


    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ success: false, message: "Registration failed!" });
    }
}

// user login api

const login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validation
        if (!email || !password || !role) {
            res.status(422).json({ success: false, message: "Something is missing in email/password" });
            return;
        }

        const userlogin = await User.findOne({ email: email });

        if (!userlogin) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        if (role !== userlogin.role) {
            return res.status(401).json({ message: `Account doesn't exist with current role` });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, userlogin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }


        // Return token for future authentication
        const token = jwt.sign({ userId: userlogin._id }, process.env.JWT_SECRET);

        res.cookie("token", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            sameSite: 'strict'
        })

        res.status(200).json({ success: true, message: 'User successfully logged in', userlogin, token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Login failed!" });

    }
}

const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: 0
        })
        res.status(200).json({ success: true, message: 'Logged out successfully.' })
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: "Logout failed!" });
    }
}


const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { fullName, email, phoneNumber, bio, skills } = req.body;


        const skillArray = skills.split(',');
        let updatedUser = await User.findByIdAndUpdate(userId, {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            profile: {
                bio: bio,
                skills: skillArray
            }
        },
            { new: true }
        );


        // Check if the user was updated successfully
        if (!updatedUser) {
            return res.status(404).json({ error: 'User or UserDetail not found', success: false });
        }

        // Return the updated user profile
        res.json({ user: updatedUser, message: "user update successfully", success: true });
    } catch (error) {
        console.error('Error in uploading:', error);
        res.status(500).json({ error: 'Internal Server Error', success: false });
    }
};

module.exports = {register, login, logout, updateProfile}