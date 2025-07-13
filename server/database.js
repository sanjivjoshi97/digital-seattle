// Using sequelize for a better approach than sqlite. 
const { Sequelize } = require('sequelize');

// Instantiate a new sequelize for use. 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shelter.db',
    logging: false  // not to log queries in logs.            
});

// Export sequelize to other files for defining models. 
module.exports = sequelize;