const express = require("express");
const bodyParser = require("body-parser");
const { evaluate } = require("./utils");

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.post("/pred", (req, res) => {
  let results = {};
  for (let pred in req.body) {
    let content = req.body[pred];
    let eval = evaluate(content);
    results[pred] = eval;
    console.log({ name: pred, content, eval });
  }
  res.send(results);
});

app.post("/obs", (req, res) => {
  res.send({});
});

app.listen(port, () => {
  console.log(`Contexte manager listening on port ${port}`);
});
