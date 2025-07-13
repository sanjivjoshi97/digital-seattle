// A simple database for storing and retrieving local to the server. Not great
// for scaling applications but for simplicity purposes of the assignment. 

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// An IIFE to init a db.
(async () => {
    const db = await open({
        filename: './shelter.db',
        driver: sqlite3.Database
    });

    // Init a simple table 'donations'.
    await db.exec(`
        CREATE TABLE IF NOT EXISTS donations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            donor_name TEXT NOT NULL,
            donation_type TEXT NOT NULL,
            quantity REAL NOT NULL,
            donation_date DATE NOT NULL
        );
    `);
    
    console.log("Database initialized successfully.");
})();