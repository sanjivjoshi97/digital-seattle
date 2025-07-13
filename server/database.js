// Using sequelize for a better approach than sqlite. 
import { Sequelize } from 'sequelize';

// Instantiate a new sequelize for use. 
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './shelter.db',
    logging: false  // not to log queries in logs.            
});

// Export sequelize to other files for defining models. 
export default sequelize;
