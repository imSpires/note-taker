const router = require('express').Router();
const uuid = require("uuid");
const fs = require('fs');


// Post function to add a new note
router.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("../../db/db.json"));
    const newNotes = req.body;
    console.log(newNotes);
  
    // Set a unique id to new note
    newNotes.id = uuid.v4();
    notes.push(newNotes)
    fs.writeFileSync("../../db/db.json", JSON.stringify(notes))
    res.json(notes);
  })

module.exports = router;