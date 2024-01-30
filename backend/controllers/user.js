const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const {setUser}=require('../service')

const authenticate=require('../middlewares/authenticate');
async function handleUserSignup(req, res) {
    const { firstName, lastName, email, password, cPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !cPassword) {
        return res.status(422).json({ error: ("Please fill the all field") });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: ("User already Exist") });
        }
        else if (password != cPassword) {
            return res.status(422).json({ error: ("Passwords do not match") });
        }
        else {
            const user = new User({ firstName, lastName, email, password, cPassword });



            const registeredUser = await user.save();
            if (registeredUser) {
                return res.status(201).json({ message: "user registered successfully" });
            }
            else {
                res.status(500).json({ error: "failed to register" })
            }

        }

    }
    catch (err) {
        console.log(err);
    }
}

async function handleUserLogin(req, res) {
    console.log(req.body);
    // res.json({message:""});
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        const userLogin = await User.findOne({ email: email })
        console.log(userLogin);

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });
            }
            else {
                res.json({ message:"user Signin Successfully" });
            }
        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = { handleUserLogin, handleUserSignup };



//for adding a cookie in any route
// res.cookie("test","sandeep")