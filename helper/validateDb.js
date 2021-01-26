const { logger } = require("../logger");
const sequelize = require("../models/index");

const assertDatabaseConnectionOk = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected");
    sequelize.sync();
  } catch (error) {
    logger.error("Unable to connect to the database:");
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = { assertDatabaseConnectionOk };
