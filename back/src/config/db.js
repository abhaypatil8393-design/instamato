const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

let connection;
async function connectDB(){
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!connection) {
        connection = mongoose.connect(process.env.MONGO_URL).catch((error) => {
            connection = undefined;
            throw error;
        });
    }

    return connection;
}

module.exports = connectDB;
