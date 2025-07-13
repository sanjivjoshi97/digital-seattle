import express, { json } from 'express';
import cors from 'cors';
import sequelize from './database.js';

const app = express();

// TODO: replace with dotenv later.
const PORT = process.env.PORT || 5001;

// we want the frontend to talk.
app.use(cors());
// parse incoming json
app.use(json());

// middlewares if any (might create a good folder if many)



// error middleware if any 




// start the server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await sequelize.sync();
        console.log('All models were synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or start the server:', error);
    }
}

await startServer();