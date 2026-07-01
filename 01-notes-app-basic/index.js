const express = require('express');

const app = express();

app.use(express.json()); // Parse Json Body

const NOTES = []; // In-Memory variable to store notes


// POST - Create Notes

app.post("/notes", (req, res) => {
    
    const note = req.body.note

    NOTES.push(note);

    res.json({
        message : "Note Created Successfully"
    })
})


// GET - Get all Notes

app.get("/notes", (req, res) => {

    res.json({
        NOTES
    })
})


app.listen(3000);