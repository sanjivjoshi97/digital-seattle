// Donation model
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

// Define the 'Donation' model
// This model maps to the 'donations' table in the database.
const Donation = sequelize.define('Donation', {
    // The 'id' field is automatically created by sequelize as a primary key
    // with auto-incrementing integer values, so we don't need to define it here.

    donor_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donation_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    donation_date: {
        type: DataTypes.DATEONLY, // 'YYYY-MM-DD'
        allowNull: false
    }
}, {
    // Model options
    tableName: 'donations', // Table name
    timestamps: false       // Disable automatic `createdAt` and `updatedAt` fields since we handle it on our own
});

// Export the model so it can be used by our Express routes.
export default Donation;
