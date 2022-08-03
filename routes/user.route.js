const express = require('express');
const userModel = require('../models/user.model');
const { verifyTokenAuthorization, verifyTokenAuthorizationAdmin } = require('./verifyToken');
const router = express.Router();
const bcrypt = require('bcrypt');
// GET ALL USERS
router.get('/', verifyTokenAuthorizationAdmin, async (req, res) => {

    try {
        const dbusers = await userModel.find();
    res.status(200).json(dbusers);
    } catch (error) {
        res.status(500).json(error)
    }
})
// UPDATE USER
router.put('/:id',verifyTokenAuthorization, async (req,res) => {

    // check if current logged in user is updating its own user details
    // logged user can update only his own details, except admin
    if(req.params.id === req.body._id || req.user.isAdmin) {
        // encrypt the password 
        // console.log('===>req.body.password', req.body.password);

        if(req.body.password) {

            // validate password
            const dbuser1 = await userModel.findById(req.body._id);
            const validated = await bcrypt.compare(req.body.password, dbuser1.password);
            const response = {status: 'failed',message: 'Invalid password'}
             if(!validated) {
                res.status(200).json({response: response})
                res.end();
             } else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    let hashedPassword = await bcrypt.hash(req.body.password, salt);
                   
                    // console.log('===> hashedPassword', req.params.id);
                    // console.log('req.body', req.body);
                    req.body.password = hashedPassword;
                    const {password, ...others} = req.body;
                    // console.log('others', others);
                    const dbuser = await userModel.findByIdAndUpdate(req.params.id, 
                    {$set: others}, {new: true})
                        
                    !dbuser && res.status(404).json({message: 'user not found'})
                    // console.log('...dbuser', dbuser);
                    
                const responseData = {
                    _id: req.body._id,
                    about: dbuser.about,
                    addressLine1: dbuser.addressLine1,
                    addressLine2: dbuser.addressLine2,
                    city: dbuser.city,
                    contact: dbuser.contact,
                    country: dbuser.country,
                    dateOfBirth: dbuser.dateOfBirth,
                    email: dbuser.email,
                    gender: dbuser.gender,
                    isAdmin: dbuser.isAdmin,
                    name: dbuser.name,
                    pincode: dbuser.pincode,
                    profilePicture: dbuser.profilePicture,
                    state: dbuser.state,
                }
                const response = {
                    status: 'success',
                    message: 'Updated successfully, Please login.'
                }
                responseData.response = response;
                res.status(200).json(responseData);
    
                     
                } catch(error) {
                    res.status(500).json(error);
                }
             }
            
        } else {
            res.status(200).json({message: 'password is required'})
        }

        // try {
            // console.log('req.params.id', req.params.id);
            // console.log('req.body', req.body);

            // const dbuser = await userModel.findByIdAndUpdate(req.params.id, 
            //     {$set: req.body}, {new: true})
            //     !dbuser && res.status(404).json({message: 'user not found'})
                
            //     res.status(200).json(dbuser);

        // } catch (error) {
            
        //     res.status(500).json(error);
        // }

     

    }
})


// delete user

router.delete('/:id', async(req, res) => {

    if(req.params.id === req.body.userId || req.body.isAdmin) { {

        try {
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'Account has been deleted'});

        } catch (error) {
            res.status(500).json(error)
        }
    }

    } else {

        res.status(403).json({message: 'You can delete your own record.'});
    }
})


// get user

router.get('/:id', async(req, res) => {

    try {
        const dbuser = await userModel.findById(req.params.id);
        const {password, ...others} = dbuser._doc; 
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error)
    }
})

// get address details of user 
router.get('/addressDetails/:id', async(req, res) => {

    try {
        const dbuser = await userModel.findById(req.params.id);
        const {password, ...others} = dbuser._doc; 
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error)
    }
})

// create user
router.post('/', async(req, res)  => {


        try {
            const newuser = new userModel(req.body);
            const dbuser = await newuser.save();
            const {password, ...others} = dbuser._doc; 
            res.status(200).json(others);
    
        } catch (error) {
            res.status(500).json(error)
        }
})
module.exports = router;