const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const port = 3500;

app.post("/text", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Commands middleware listening on port ${port}`);
});
