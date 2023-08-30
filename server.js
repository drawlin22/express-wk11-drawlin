const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public')); /* using express to set the public folder as the folder to hold static (non changing) files */

app.get('/', (req, res) => {  /* when the route handler is called the index.HTML file is sent back to the user */    
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {  /* when the route handler is called the notes.HTML file is sent back to the user */ 
console.log('Get/notes');
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(JSON.parse(data))
        }
    })
})

app.get('/notes', (req, res) => {
    console.log('Get notes');
    var data = fs.readFileSync("db.json");
    var notes = JSON.parse(data);
    res.json(notes);   
  });

app.post('/api/notes', (req, res) => { /* pushing a new note post */
  
    const { title, text} = req.body;
  
    if (title && text) {
    const newNote = {
        id: uuidv4(),
        title,
        text,
    }

    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if(err) {
            res.status(500).json(err); /* console log errors */
        } else {
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
        
    
    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),
    (err) =>
    err ? res.status(500).json(err) /* console log errors */
    : res.status(201).json('Successfully updated notes!')
    )
    }
    })
    }
  })

  app.delete ('/api/notes/:id', (req, res) => { /* removing posts */
  fs.readFile('./db/db.json', 'utf8', (err,data) => {
    if (err) {
        res.status(500).json(err)
    } else {
const parsedNotes = JSON.parse(data)
const filteredNotes = parsedNotes.filter(note => note.id !== req.params.id)
fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) =>
err 
? res.status (500).json(err)
: res.status(200).json('db.json updated')
)
    }
  })
})

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  });

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
