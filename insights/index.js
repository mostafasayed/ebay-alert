const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const publishMsg = require("./publisher");

app.post("/events", async (req, res) => {
  // Expected request body to be {type: "", data: {subject, body}}
  const { type, data } = req.body;
  // send data to pubisher based on insight type
  if (type === "CheapestProductInsight") {
    try {
      const { subject, body } = data;
      publishMsg(type, subject, body);
    } catch (error) {
      res.send({ status: "failed" });
    }
  }
  res.send({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Listening to Insights 5000");
});

module.exports = app;
