const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 4589,
  cors = require("cors"),
  restCtrl = require("./controllers/restCtrl");

app.use(bodyParser.json());
app.use(cors());

app.get("/api/get-me-data", restCtrl.getMeData);
app.delete("/api/acquit/:id", restCtrl.acquit);
app.post("/api/make-arrest", restCtrl.makeArrest);

app.listen(port, () => {
  console.log(`Listening for joes review on ${port}`);
});
