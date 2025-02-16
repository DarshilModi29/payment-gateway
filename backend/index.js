const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("./src/db/index");
require("dotenv").config();
const userRouter = require("./src/router/user");
const accountRouter = require("./src/router/account");
const transactionRouter = require("./src/router/transaction");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(userRouter);
app.use(accountRouter);
app.use(transactionRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})