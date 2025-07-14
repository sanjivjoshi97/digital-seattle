// Import dependencies
import express, { json } from 'express';
import cors from 'cors';

// Import DB connection and model
import sequelize from './database.js';
import Donation from './models/donation.model.js';

// Initialize the Express app
const app = express();

// Port configuration — fallback to 5001 if not set
// TODO: Replace this with dotenv for managing environment variables securely
const PORT = process.env.PORT || 5001;

// Enable CORS so frontend (different origin) can access this backend
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(json());

// --- Routes Section ---
// NOTE: These can be refactored into separate route/controller files if they grow in number

/**
 * GET /api/donations
 * Fetch all donations, sorted by donation date in descending order
 */
app.get('/api/donations', async (req, res) => {
    try {
        const donations = await Donation.findAll({
            order: [['donation_date', 'DESC']]
        });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message }); // Internal Server Error
    }
});

/**
 * POST /api/donations
 * Create a new donation from request body data
 */
app.post('/api/donations', async (req, res) => {
    try {
        const newDonation = await Donation.create(req.body);
        res.status(201).json(newDonation); // 201 = Created
    } catch (err) {
        res.status(400).json({ error: err.message }); // Bad Request (e.g. validation error)
    }
});

/**
 * PUT /api/donations/:id
 * Update an existing donation by ID
 */
app.put('/api/donations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' }); // Not Found
        }

        const updatedDonation = await donation.update(req.body);
        res.json(updatedDonation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * DELETE /api/donations/:id
 * Delete a donation by ID
 */
app.delete('/api/donations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findByPk(id);

        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        await donation.destroy();
        res.status(204).send(); // 204 = No Content
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// This can catch and format any unhandled errors thrown in routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// --- Server Startup ---
// Connect to the database and start listening for requests
const startServer = async () => {
    try {
        await sequelize.authenticate(); // Test DB connection
        console.log('Database connected.');

        await sequelize.sync(); // Sync models with DB
        console.log('All models were synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database or start the server:', error);
    }
};

// Start the server
await startServer();
