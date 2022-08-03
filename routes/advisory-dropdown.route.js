const express = require('express');
const advisoryDropdownModel = require('../models/advisory-dropdown.model');
const router = express.Router();
router.get('', async (req, res) => {

    const dbresult = await advisoryDropdownModel.find();
    !dbresult && res.status(404).json('Data is not available');

    dbresult && res.status(200).json(dbresult);
})

module.exports = router;
