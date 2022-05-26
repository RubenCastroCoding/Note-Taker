const fs = require('fs');
const path = require('path')

const allNotes = require('./db.json');

function newNote(body) {
    const {title, text} = body 

    let newNotes = {
        title,
        text,
        id: uniqid()
    }
    allNotes.push(newNotes);

    fs.writeFileSync(path.join(__dirname, '../db.db/json')),
    JSON.stringify(allNotes);

}

module.exports(newNote)


