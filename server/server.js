const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const sequelize = require('./database');
const Donation = require('./models/donation.model');

const app = express();

// TODO: replace with dotenv later.
const PORT = process.env.PORT || 5001;

// we want the frontend to talk.
app.use(cors());
// parse incoming json
app.use(express.json());

// middlewares if any (might create a good folder if many)



// error middleware if any 




// start the server
app.listen(PORT, () => {
    // TODO: add logger
    console.log(`Server started on ${PORT}`);
})