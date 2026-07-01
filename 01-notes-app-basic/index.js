const express = require('express');

const app = express();

app.use(express.json()); // Parse Json Body

const NOTES = []; // In-Memory variable to store notes


// POST - Create Notes

app.post("/notes", (req, res) => {

    const note = req.body.note

    NOTES.push(note);

    res.json({
        message: "Note Created Successfully"
    })
})


// GET - Get all Notes

app.get("/notes", (req, res) => {

    res.json({
        NOTES
    })
})

// GET - Serve FE

app.get("/", (req, res) => {
    res.sendFile("/home/ab/Documents/100x/New/Week 9 Notes-App/frontend/index.html")
})


app.listen(3000);