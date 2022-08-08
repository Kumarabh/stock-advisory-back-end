const advisoryDataModel = require('../models/advisory-data.model');
const { verifyTokenAuthorizationAdmin } = require('./verifyToken');

const router = require('express').Router();

// GET ALL advisory data
router.get('', async (req, res) => {

    const dbresult = await advisoryDataModel.find();

    !dbresult && res.status(404).json('advisory does not exist')

    res.status(200).json(dbresult);
})

// CREATE ADVISORY
router.post('', async (req, res) => {

    // const emailExists = await advisoryDataModel.findOne({email: req.body.email})
    // emailExists && res.status(500).json('Email exists');

    // const contactExists = await advisoryDataModel.findOne({contact: req.body.contact})
    // contactExists && res.status(500).json('contact exists');

    const dbresult = await advisoryDataModel.create(req.body);

    !dbresult && res.status(500).json({errorResponse: {status: 'failed', message: 'Advisory not created'}})

    const response = {
        status: 'success',
        message: 'Advisory added successfully.'
    }
    const dbresponse = {
        response: dbresult,
        errorResponse: response
    }
    res.status(200).json(dbresponse);

})

router.put('/:id', async (req, res) => {

    const advisoryExists = await advisoryDataModel.findOne({_id: req.params.id})
    !advisoryExists && res.status(404).json('advisory does not exists');

    const dbresult = await advisoryDataModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    !dbresult && res.status(500).json('Error during update');

    dbresult && res.status(200).json(dbresult);

})


// get advisory by id
router.get('/:id', async (req, res) => {

    const advisoryExists = await advisoryDataModel.findOne({_id: req.params.id})
    !advisoryExists && res.status(404).json({errorResponse: {status: 'success', message: 'Advisory does not exist.'}})

    const dbresult = await advisoryDataModel.findOne({_id: req.params.id});
    dbresult && res.status(200).json(dbresult);

})

// get advisory by id
router.delete('/:id', async (req, res) => {

    const advisoryExists = await advisoryDataModel.findOne({_id: req.params.id})
    !advisoryExists && res.status(404).json({errorResponse: {status: 'success', message: 'Advisory does not exist.'}})

    const dbresult = await advisoryDataModel.deleteOne({_id: req.params.id});
    dbresult && res.status(200).json({errorResponse: {status: 'success', message: 'Advisory deleted successfully.'}});
    
})


module.exports = router;