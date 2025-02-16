const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./src/db/index");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})