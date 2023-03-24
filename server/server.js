require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("src"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.listen(3000);
