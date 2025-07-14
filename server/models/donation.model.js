// Import Sequelize's DataTypes for defining model field types
import { DataTypes } from 'sequelize';

// Import the initialized Sequelize instance
import sequelize from '../database.js';

// Define donation types 
const DONATION_TYPES = ['Money', 'Food', 'Clothing', 'Supplies', 'Other'];

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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Donor name cannot be empty." // Custom error message
            },
            len: {
                args: [2, 50], // Must be between 2 and 50 characters
                msg: "Donor name must be between 2 and 50 characters."
            }
        }
    },

    // Type of donation (e.g., Money, Food, Clothing, etc.)
    donation_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [DONATION_TYPES], // Must be one of the specified types
                msg: "Invalid donation type specified."
            }
        }
    },

    // Quantity of the donated item or amount of money donated
    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: {
                msg: "Quantity must be a number."
            },
            min: {
                args: [0.01], // Quantity must be greater than 0
                msg: "Quantity or amount must be positive."
            }
        }
    },

    // Date of donation in 'YYYY-MM-DD' format
    donation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: "A valid donation date is required."
            }
        }
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
