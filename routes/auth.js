var express = require('express');
var router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// REGISTER
router.post('/register', async(req, res, next) => {
    
    const dbuser = await userModel.findOne({email: req.body.email})
    dbuser && res.status(200).json({status: 'failed',message: 'Email exists'});

    const contactExists = await userModel.findOne({contact: req.body.contact})
    contactExists && res.status(200).json({status: 'failed',message: 'Contact exists'});

    // try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
console.log('req.body', req.body)

    if(req.body.email) {
        req.body.email = req.body.email.toLowerCase()
    }
      const postData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        isAdmin: req.body.isAdmin,
        // password: req.body.password,
        // cpassword: new FormControl('', Validators.required),
        dateOfBirth: req.body.dateOfBirth,
        profilePicture: req.body.profilePicture,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        pincode: req.body.pincode,
        about: req.body.about,
        contact: req.body.contact,
        password: hashedPassword
      }
      console.log('postData', postData)

      const result = await new userModel(postData).save();
      console.log(result)

      res.status(200).json({status: 'success', message: 'User created'});

    // } catch (error) {
    //     res.status(500).json(error)
    // }

})


router.post('/login', async (req, res, next) => {

  try {
    
    if(req.body.email) {
        req.body.email = req.body.email.toLowerCase()
    }
    const dbuser = await userModel.findOne({email: req.body.email})
    // !dbuser && res.status(400).json({message: 'Email not found'});
    // !req.body.password && res.status(403).json({message: 'Invalid pasword'});
     if(!dbuser) {
        res.status(200).json({status: 'failed',message: 'Email does not exist, please create one.'});
     } else if(!req.body.password) {
        res.status(200).json({status: 'failed',message: 'Invalid pasword'});
     } else {

        console.log('dbuser', dbuser);
        console.log('req.body.password', req.body.password);
  
        const validated = await bcrypt.compare(req.body.password, dbuser.password);
        console.log('validated', validated);
        if(!validated) {
          const response = {status: 'failed',message: 'Incorrect email/password'}
            res.status(200).json({response: response});
        } else {
            const token = jwt.sign({
                // username: req.body.username,
                // password: req.body.password
                // id: dbuser._id,
                // isAdmin: dbuser.isAdmin
                                                                                                                                 
                    _id: dbuser._id,
                    name: dbuser.name, 
                    email: dbuser.email, 
                    // password: '$2b$10$T8EO0O1bF32K2XeDiPUDi.iQzfPy1pgR47Gr7/mIAVk35xcmw7fPS',                                              
                     gender: dbuser.gender,                                                                                                         
                     dateOfBirth: dbuser.dateOfBirth, 
                     profilePicture: dbuser.profilePicture,                                                                                                    
                      isAdmin: dbuser.isAdmin,                                                                                                         
                      addressLine1: dbuser.addressLine1,                                                                                
                      addressLine2: dbuser.addressLine2,                                                                                                  
                      city: dbuser.city,                                                                                                         
                      state: dbuser.state,                                                                                                 
                      country: dbuser.country,                                                                                                       
                      pincode: dbuser.pincode,                                                                                                      
                      contact: dbuser.contact,                                                                                                  
                      about: dbuser.about,                                                                                               
                    //   createdAt: '2022-05-29T08:20:57.874Z', 
                                                                                                         
                    //   updatedAt: '2022-05-29T08:20:57.874Z',                                                                                    
                    //   __v: 0                                                                                                                
                
      
            }, process.env.SECRET_KEY, {expiresIn: '600s'})
            const tokens = [token]
            const {password, ...others} = dbuser._doc;
            const response = {
                status: 'success',
                message: 'success'
            }
            others.response = response;
            res.status(200).json({others, tokens});
        }
     

     }
   

  } catch (error) {
      res.status(500).json({status: 'failed',message: error});
  }

})


router.post('/change-password', async (req, res) => {

  console.log('change-password req.body', req.body);
  const dbuser = await userModel.findById(req.body._id);


  const validated = await bcrypt.compare(req.body.currentPassword, dbuser.password);
        console.log('validated', validated);
        if(!validated) {
          const response = {status: 'failed',message: 'Incorrect current password'}
            res.status(200).json({response: response});
        } else if(validated) {

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          req.body.password = hashedPassword
          const updatedUser = await userModel.findByIdAndUpdate(req.body._id, 
          {$set: req.body}, {new: true})
          if(updatedUser) {
            const response = {status: 'success', message: 'Password updated.'}
            res.status(200).json({response: response})
          } else {
            const response = {status: 'failed', message: 'Not Updated'}
            res.status(404).json({response: response})

          }
  


        }



})
module.exports = router;
