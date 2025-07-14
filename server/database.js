// Using Sequelize ORM for better structure and flexibility than raw SQLite queries
import { Sequelize } from 'sequelize';

// Initialize a new Sequelize instance configured to use SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',               // Specify the database engine
    storage: './shelter.db',         // Path to the SQLite database file
    logging: false                   // Disable SQL query logging in the console
});

// Export the configured Sequelize instance for use in model definitions and DB interactions
export default sequelize;
