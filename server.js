const express = require('express');
const path = require('path');

const fs = require('fs');
const { title } = require('process');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
}),

app.get('/api/notes', (req, res) => {
console.log('Get/notes');
  res.sendFile(path.join(__dirname, '/public/notes.html'))
}),

app.post('/', (req, res) => {
  
    const { notetitle, noteText, errors } = req.body;
  
    const newNote = {
        title,
        text,
    };
  
    {
      readAndAppend(newNote, './db/app.json');
      res.json(`Note information added 🔧`);
    } 

    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);

            parsedNotes = JSON.push(title, text);
        }
    })

    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes),
    (writeErr) =>
    writeErr ? console.err(writeErr)
    : console.info('Successfully updated notes!')
    )

  });


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
});