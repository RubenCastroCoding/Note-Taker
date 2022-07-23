//Get modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const notes = require('./db/db.json');


//Use express middleware
const app = express(); 
const PORT = process.env.PORT || 3000;

//Make unique ID
let uuid = new ShortUniqueId({ length: 4});

//How to handle data
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Get home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Get notes page 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Get notes info
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

//Post info to the notes file
app.post("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", "utf8", function(error, response) {
      if (error) {
          console.log(error);
      } 

        const { title, text } = req.body;
        const newNote = {
          title,
          text,
          id: uuid()
        }
        notes.push(newNote)


     fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
          if (err) throw err;
          res.json(notes);
      });
  });
  

}) 


// Delete Info

app.delete('/api/notes/:id', function (req, res) {

  const noteQuery = req.params.id;
  console.log(noteQuery)

  fs.readFile("./db/db.json", "utf8", function(error, response) {
      if(error){
        console.log(error);
      } 

      if (noteQuery) {
        
        for (let i = 0; i < notes.length; i++) {
          if (noteQuery === notes[i].id) {
            notes.splice(i, 1)
            return res.send(notes);
          }
        }
      }
      fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
        if (err) throw err;
        res.json(notes);
    });

  })//end of readFile

});//end of app.delete
  

//Set up port to listen to requests
app.listen(PORT, () =>
  console.log(`Note app listening at ${PORT}`)
);
