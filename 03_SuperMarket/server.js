require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./router/router");
app.use(cors());
app.use(express.json());
app.use("/", routes);


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

