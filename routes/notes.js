const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');


router.post('/addnote', fetchuser, [
    body("title", "Give valid title").isLength({min:1}), 
    body("description", "Give valid description").isLength({min:5})],
    async(req, res) => {
        console.log("req" + req.title);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        try{
            const {title, description, tag} = req.body
            const note = new Note({title, description, tag, user: req.user.id});
            const result = await note.save();
            res.send(result);
        }catch(error){
            console.log("error"+error);
            res.status(500).send("some error occured!");
        }
})

router.get('/getnotes', fetchuser, async(req, res) => {
    const userId = req.user.id;
    try{
    const notes = await Note.find({user: userId});
    res.json(notes);
    }catch(error){
        console.log("error"+error);
        res.status(500).send("some error occured!");
    }

})

router.put('/updatenote/:id', fetchuser, async(req, res) => {
    try{
    const note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found!");
    }
    if(note.user.toString() != req.user.id){
        return res.status(400).send("Invalid Credentials!");
    }
    const {title, description, tag} = req.body;
    note.title = title? title : note.title;
    note.description = description? description : note.description;
    note.tag = tag? tag : note.tag;
    const updatedNote = await Note.findByIdAndUpdate(note.id, {$set:note}, {new:true});
    res.json(updatedNote);
    }catch(error){
        console.log("error"+error);
        res.status(500).send("some error occured!");
    }
})

router.delete('/deletenote/:id', fetchuser, async(req, res) => {
    try{
    const note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found!");
    }
    if(note.user.toString() != req.user.id){
        return res.status(400).send("Invalid Credentials!");
    }
    const deletedNote = await Note.findByIdAndDelete(note.id);
    res.json({"msg": "successfully deleted!", "note": deletedNote});
    }catch(error){
        console.log("error"+error);
        res.status(500).send("some error occured!");
    }

})

module.exports = router;