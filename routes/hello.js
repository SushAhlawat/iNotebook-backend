const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


router.get('/', async(req, res) => {
    res.send("Hello world");

})

module.exports = router;