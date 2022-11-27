const router = require('express').Router();
//import todo model 
const userModel = require('../models/usermodel');
const bcrypt = require("bcrypt");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const TokenChecker =require('../TokenChecker') ;

const ts = Date.now();

//Registration User
router.post('/api/user/registration', async (req, res) => {
    try {

        const emailX = req.body.email;
        const naamX = req.body.naam;
        const Chabi = req.body.chabbi;
        const emailExist = await userModel.findOne({ 'email': emailX }); // Finding the Email exist or not
        const naamExist = await userModel.findOne({ 'naam': naamX }); // Finding the Naam exist or not
        const StrongChabi = validator.isStrongPassword(req.body.chabbi, {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        });

        // console.log(emailX, "Email Exist: =>", emailExist);
        // console.log(naamX, "Name Exist: =>", naamExist);

        if (emailExist == null && naamExist == null) {
            if (StrongChabi == true) {

                const salt = await bcrypt.genSalt(10);
                const vungChabi = await bcrypt.hash(Chabi, salt);

                const newItem = new userModel({
                    fullname: req.body.fullname,
                    email: emailX,
                    naam: naamX,
                    chabbi: vungChabi,
                    date: ts,
                    role: "user"
                })
                //save this item in database
                const saveItem = await newItem.save()

                const alluser = await userModel.find({});
                res.status(200).json({ saveItem, alluser });
                console.log("Registered User => " + req.body.fullname);
            }
            else {
                res.status(400).json({ 'ErrorMsg': 'Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ' })
            }
        }
        else {
            res.status(409).json({ 'ErrorMsg': 'Email or Username already Exist' })
        }

        // res.status(200).json(saveItem);
    } catch (err) {

        res.status(500).json({ 'ErrorMsg': 'Server ERROR' });
        console.log("Boom" + err);
    }

})

// Admin Registration
router.post('/api/user/registration/admin', async (req, res) => {

    const emailX = req.body.email;
    const naamX = req.body.naam;
    const Chabi = req.body.chabbi;
    const emailExist = await userModel.findOne({ 'email': emailX }); // Finding the Email exist or not
    const naamExist = await userModel.findOne({ 'naam': naamX }); // Finding the Naam exist or not
    const StrongChabi = validator.isStrongPassword(req.body.chabbi, {
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    });

    // console.log(emailX, "Email Exist: =>", emailExist);
    // console.log(naamX, "Name Exist: =>", naamExist);
    try {

        if (emailExist == null && naamExist == null) {
            if (StrongChabi == true) {

                const salt = await bcrypt.genSalt(10);
                const vungChabi = await bcrypt.hash(Chabi, salt);

                const newItem = new userModel({
                    fullname: req.body.fullname,
                    email: emailX,
                    naam: naamX,
                    chabbi: vungChabi,
                    date: ts,
                    role: "admin"
                })
                //save this item in database
                const saveItem = await newItem.save()

                const alluser = await userModel.find({});
                res.status(200).json({ saveItem, alluser });
                console.log("Registered User => " + req.body.fullname);
            }
            else {
                res.status(400).json({ 'ErrorMsg': 'Password not strong engough. Lower Case, Upper Case, Symbol & Min 8 Char. ' })
            }
        }
        else {
            res.status(409).json({ 'ErrorMsg': 'Email or Username already Exist' })
        }

        // res.status(200).json(saveItem);
    } catch (err) {

        res.status(500).json({ 'ErrorMsg': 'Server ERROR' });
        console.log("Boom" + err);
    }
})

// Login Process
router.post('/api/login', async (req, res) => {
    const emailX = req.body.email;
    const Chabi = req.body.chabbi;
    try {
        const emailExist = await userModel.findOne({ 'email': emailX }); // Finding the Email exist or not

        if (emailExist == null) {
            res.status(404).json({ 'ErrorMsg': 'Email Incorrect' });
        }
        else {
            const validated = await bcrypt.compare(req.body.chabbi, emailExist.chabbi)
            if (validated) {
                token = jwt.sign(
                    { userId: emailExist._id, email: emailExist.email, role: emailExist.role },
                    process.env.JWT_SECRET_KEY,
                    { algorithm:"HS256", expiresIn: "1h" }
                    // { expiresIn: "1h" }
                );
                res.status(200).json({ "Success": [{ 'Token': token, 'id': emailExist._id, 'name': emailExist.fullname, 'email': emailExist.email, 'username': emailExist.naam }] })
            }
            else {
                res.status(400).json({ "ErrorMsg": "Wrong Password" });
            }
        }
    } catch (error) {
        res.status(500).json({ 'ErrorMsg': "Server Error" })
    }

})


// get an User data
router.get('/api/user/:id', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        if(!!theToken){
        const tokenResult = TokenChecker.TokenChecker(theToken);
        console.log("Return Token ",tokenResult);
        
        if(tokenResult)
        {
            console.log("Lol Token ",tokenResult);
            const theUser = await userModel.findById(req.params.id);
            res.status(200).json(theUser);
        }
        else {
            res.status(401).json({"ErrorMsg": "Unauthorized User"})
        }
    }
    else{
        res.status(406).json({"ErrorMsg": "Undifined Auth Token"})
    }

    } catch (err) {
        res.json({ 'Error': err, 'ErrorMsg': "Server Error" });
    }
})

// get All Users Data
router.get('/api/users', async (req, res) => {
    try {
        const theToken = req.headers.authorization;
        console.log("Check Token User => ",theToken);
        if(!!theToken){
            const tokenResult = TokenChecker.TokenChecker(theToken);
            console.log(tokenResult);
            // const alluser = [];
            if (tokenResult.role === 'admin') {
                // res.status(200).json({ success: true, data: { userId: decodedToken.userId, email: decodedToken.email } })
                const alluser = await userModel.find({})
                res.status(200).json(alluser)
            }
            else {
                res.status(401).json({ "ErrorMsg": "User Not an Admin" })
            }
        }
        else{
            res.status(406).json({"ErrorMsg": "Undifined Auth Token"})
        }

    } catch (err) {
        res.status(500).json({ 'Error': err, 'ErrorMsg': "Server Error" });
    }
})




//Delete item from database
router.delete('/api/user/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteUser = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ 'msg': 'User Deleted' });
    } catch (err) {
        res.json(err);
    }
})


//export router
module.exports = router;