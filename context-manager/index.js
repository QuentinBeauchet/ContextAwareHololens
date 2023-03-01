const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const { manage } = require("./manager/manager");

const app = express();
const port = 3000;

app.use(cors());
app.use("/assets", express.static("assets"));
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.sendFile(path.join(__dirname, "./manager/parameters/tasks.json"));
});

app.post("/update", (req, res) => {
  console.log("--------- Incomming update ---------");
  manage(req.body);
  res.sendStatus(200);
});

app.get("/rest/things", (req, res) => {
  console.log("--------- Incomming update ---------");
  manage(req.body);
  res.sendStatus(200);
});

app.get("/rest/posts", (req, res) => {
  console.log("--------- Incomming update ---------");
  manage(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Context Manager listening on http://localhost:${port}`);
});
