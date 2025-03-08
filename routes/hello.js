const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


router.get('/', async(req, res) => {
    res.send("Hello World");

})

module.exports = router;