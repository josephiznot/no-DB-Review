const axios = require("axios");

let arrests = [];
let id = 0;
axios
  .get(
    "https://data.police.uk/api/crimes-no-location?category=all-crime&force=leicestershire"
  )
  .then(response => {
    arrests = response.data;
  });

module.exports = {
  getMeData: (req, res, next) => {
    res.status(200).send(arrests);
  },

  acquit: (req, res, next) => {
    let { id } = req.params;
    let acquittedId = arrests.findIndex(e => {
      return e.id == id;
    });
    arrests.splice(acquittedId, 1);
    res.status(200).send(arrests);
  },

  makeArrest: (req, res, next) => {
    req.body.id = id;
    id++;
    arrests.push(req.body);
    res.status(200).send(arrests);
  }
};
