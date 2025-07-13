import express, { json } from 'express';
import cors from 'cors';
import sequelize from './database.js';
import Donation from './models/donation.model.js';

const app = express();

// TODO: replace with dotenv later.
const PORT = process.env.PORT || 5001;

// we want the frontend to talk.
app.use(cors());
// parse incoming json
app.use(json());

// routes (maybe another file if too many)

// GET /api/donations - Fetch all donations
app.get('/api/donations', async (req, res) => {
    try {
        const donations = await Donation.findAll({
            order: [['donation_date', 'DESC']]
        });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/donations - Create a new donation
app.post('/api/donations', async (req, res) => {
    try {
        const newDonation = await Donation.create(req.body);
        res.status(201).json(newDonation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/donations/:id - Update an existing donation
app.put('/api/donations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        const updatedDonation = await donation.update(req.body);
        res.json(updatedDonation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/donations/:id - Delete a donation
app.delete('/api/donations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        await donation.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



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