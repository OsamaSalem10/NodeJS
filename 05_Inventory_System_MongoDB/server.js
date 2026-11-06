require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const routes = require("./routes/router");

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        process.exit(1);
    }
};

startServer();