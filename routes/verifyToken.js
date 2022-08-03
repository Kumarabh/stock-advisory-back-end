const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')
const verifyToken = (req, res, next) => {

    console.log(req.headers.authorization);
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
            error && res.status(403).json('invalid token');
            req.user = data;

        });

        next();

    } else {
        res.status(403).json('token is missing.');
    }
    

}

const verifyTokenAuthorization = (req, res, next) => {
    console.log('req.body.password vt', req.body.password);

    verifyToken(req, res, async() => {
        const dbuser = await userModel.findOne({_id: req.user._id})
        console.log('req.params.id', req.params.id);
        console.log('req.user.id', req.user._id);

        console.log('req.user', req.user);
       
        if((req.user._id == req.params.id) || req.user.isAdmin) { // same user or admin
            console.log('verifyTokenAuthorization done, next()')
            next();
        } else {
            res.status(403).json('You can access your own record, unless you are admin.');
        }

    })
}

const verifyTokenAuthorizationAdmin =  (req, res, next) => {

    verifyToken(req, res, async () => {
    // const dbuser = await userModel.findOne({username: req.user.username})
        // if(dbuser.isAdmin) { // only admin
        //     next();

        // } else {
        //     res.status(403).json('only admin can access this resource');

        // }

        if(req.user.isAdmin) { // only admin
            next();

        } else {
            res.status(403).json('only admin can access this resource');

        }

    })

}

module.exports = {verifyTokenAuthorization, verifyTokenAuthorizationAdmin}