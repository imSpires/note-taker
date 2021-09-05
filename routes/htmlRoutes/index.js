const path = require('path');
const router = require('express').Router();

//calls home page
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

//call for notes.html
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// For any 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

module.exports = router;
