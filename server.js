const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require('./routes/apiRoutes'); - couldnt get this working
const htmlRoutes = require('./routes/htmlRoutes');
const uuid = require("uuid");
const fs = require('fs');
const path = require("path");


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//This gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"))
});

// Post function to add a new note
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;

  // Set a unique id to new note
  newNotes.id = uuid.v4();
  notes.push(newNotes)
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes);
  // console.log(notes);
})

// Delete function
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote);
  // console.log(delNote);
})

// Use apiRoutes
// app.use('/api', apiRoutes); 
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});


