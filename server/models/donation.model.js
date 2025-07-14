// Import Sequelize's DataTypes for defining model field types
import { DataTypes } from 'sequelize';

// Import the initialized Sequelize instance
import sequelize from '../database.js';

/**
 * Define the 'Donation' model using Sequelize.
 * This model represents the 'donations' table in the database.
 */
const Donation = sequelize.define('Donation', {
    /**
     * NOTE: Sequelize automatically adds an `id` field as the primary key,
     * so you don’t need to define it manually unless you want to customize it.
     */

    // Donor's full name
    donor_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Type of donation (e.g., Money, Food, Clothing, etc.)
    donation_type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Quantity of the donated item or amount of money donated
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    // Date of donation in 'YYYY-MM-DD' format
    donation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }

}, {
    // Model configuration options

    // Force the table name to be 'donations' (prevents pluralization)
    tableName: 'donations',

    // Disable Sequelize's automatic `createdAt` and `updatedAt` timestamp fields
    timestamps: false
});

// Export the model so it can be used in route handlers or elsewhere in the app
export default Donation;
