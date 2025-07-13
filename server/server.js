const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();

// TODO: replace with dotenv later.
const PORT = process.env.PORT || 5001;

// we want the frontend to talk.
app.use(cors());
// parse incoming json
app.use(express.json());

// actually init the databse.
const dbPromise = open({
    filename: './shelter.db',
    driver: sqlite3.Database
});

// routes next



// middlewares if any (might create a good folder if many)



// error middleware if any 




// start the server
app.listen(PORT, () => {
    // TODO: add logger
    console.log(`Server started on ${PORT}`);
})