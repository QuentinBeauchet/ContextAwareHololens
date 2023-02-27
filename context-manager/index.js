const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const { manage } = require("./manager");
const { castVideo } = require("./commands/chromecast");

const app = express();
const port = 3000;

app.use(cors());
app.use("/assets", express.static("assets"));
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  res.send([
    {
      name: "Maintenance des prises electriques",
      steps: [
        {
          display: ["obj_1", "obj_2", "obj_3"],
        },
        {
          display: ["obj_2", "obj_5"],
          media: "video1.mp4",
        },
        {
          display: ["obj_3", "obj_5", "obj_8"],
        },
      ],
    },
    {
      name: "Affichage du plan de la salle",
      steps: [
        {
          media: "plan.png",
        },
      ],
    },
  ]);
});

app.post("/update", (req, res) => {
  console.log("--------- Incomming update ---------");
  manage(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Context Manager listening on http://localhost:${port}`);
});
