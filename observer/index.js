const express = require("express");
var cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Observer listening on http://localhost:${port}`);
});
