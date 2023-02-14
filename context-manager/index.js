const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/obs", (req, res) => {
  res.send({
    tasks: [
      {
        name: "Maintenance des prises electriques",
        steps: [
          {
            display: ["obj_1", "obj_2", "obj_3"],
          },
          {
            display: ["obj_2", "obj_5"],
            media: "video_1",
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
            media: "pdf_1",
          },
        ],
      },
    ],
    context: [
      {
        name: "Luminosité",
        states: [
          {
            name: "normal",
            value: 700,
          },
          {
            name: "tres lumineux",
            value: 1200,
          },
        ],
      },
      {
        name: "Bruit",
        states: [
          {
            name: "silencieux",
            value: 30,
          },
          {
            name: "normal",
            value: 65,
          },
          {
            name: "bruyant",
            value: 90,
          },
        ],
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Context Manager listening on http://localhost:${port}`);
});
