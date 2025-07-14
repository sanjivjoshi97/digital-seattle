// Integration testing for the Donations API using supertest

import request from 'supertest';
import { app } from '../server.js';           // Import the Express app
import sequelize from '../database.js';       // Sequelize instance for DB connection
import Donation from '../models/donation.model.js'; // Sequelize model

// Run once before all tests: reset DB schema
beforeAll(async () => {
    await sequelize.sync({ force: true }); // Drops and recreates all tables
});

// Run after each test: clean up donation records
afterEach(async () => {
    await Donation.destroy({ where: {} }); // Clear all donations
});

// Run once after all tests: close DB connection
afterAll(async () => {
    await sequelize.close();
});

describe('Donations API', () => {

    /**
     * POST /api/donations
     * Should successfully create a new donation
     */
    it('should create a new donation', async () => {
        const res = await request(app)
            .post('/api/donations')
            .send({
                donor_name: 'Test Donor',
                donation_type: 'Money',
                quantity: 100,
                donation_date: '2025-07-13'
            });

        expect(res.statusCode).toEqual(201);                      // Check status
        expect(res.body).toHaveProperty('id');                    // Check if ID was generated
        expect(res.body.donor_name).toBe('Test Donor');           // Verify correct data
    });

    /**
     * GET /api/donations
     * Should return all donations (1 in this test)
     */
    it('should fetch all donations', async () => {
        // Seed the DB with one donation
        await Donation.create({
            donor_name: 'Jane Doe',
            donation_type: 'Clothing',
            quantity: 15,
            donation_date: '2025-07-13'
        });

        const res = await request(app).get('/api/donations');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].donor_name).toBe('Jane Doe');
    });

    /**
     * PUT /api/donations/:id
     * Should update an existing donation by ID
     */
    it('should update a donation', async () => {
        // First create a donation
        const donation = await Donation.create({
            donor_name: 'John Smith',
            donation_type: 'Food',
            quantity: 50,
            donation_date: '2025-07-13'
        });

        // Update it via API
        const res = await request(app)
            .put(`/api/donations/${donation.id}`)
            .send({
                donor_name: 'John Smith Jr.',
                donation_type: 'Food',
                quantity: 75,
                donation_date: '2025-07-13'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.donor_name).toBe('John Smith Jr.');
        expect(res.body.quantity).toBe(75);
    });

    /**
     * DELETE /api/donations/:id
     * Should delete the donation by ID and confirm it's removed
     */
    it('should delete a donation', async () => {
        // Create a donation to delete
        const donation = await Donation.create({
            donor_name: 'To Be Deleted',
            donation_type: 'Supplies',
            quantity: 10,
            donation_date: '2025-07-13'
        });

        const res = await request(app).delete(`/api/donations/${donation.id}`);
        expect(res.statusCode).toEqual(204); // No content

        // Confirm deletion
        const found = await Donation.findByPk(donation.id);
        expect(found).toBeNull();
    });
});
