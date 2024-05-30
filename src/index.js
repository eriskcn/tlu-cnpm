const express = require("express");
const database = require("./config/database/index");
const setupRoutes = require('./routes');
const app = express();

// Middleware
app.use(express.json());

// Database connection
database.connect().then(() => {
    setupRoutes(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to connect to the database", error);
});
