const router = require("express").Router();
let vegSchema = require("../mongodbmods/veg.model");

//first route, endpoint for handling incoming http get requests
//i will use this on initial load of database page to get info of available entries
//create another route for selecting the specified entry
router.route("/").get((req, res) => {
  //note: GET route is http://localhost:4000/vegRoute/
  vegSchema
    .find() //pulls a list from mongoose, gets a list of all entries from mongodb atlas
    .then((veg) => res.json(veg)) //a promise in .json format of all veg entries
    .catch((err) => res.status(400).json("error: " + err));
});
//route ":/veg" should return the vegetable
router.route("/add").post((req, res) => {
  //note: post route is http://localhost:4000/vegRoute/add
  const veg = req.body.veg;
  const name = req.body.name;
  const water = req.body.water;
  const pDist = req.body.pDist;
  const gTime = req.body.gTime;
  const sType = req.body.sType;
  const tip1 = req.body.tip1;
  const tip2 = req.body.tip2;
  const newInput = new vegSchema({
    veg,
    name,
    water,
    pDist,
    gTime,
    sType,
    tip1,
    tip2,
  });
  newInput
    .save() //saves to database
    .then(() => res.json("database input recieved")) //promise followed by a confirmation message
    .catch((err) => res.status(400).json("error: " + err)); //catches errors
});
router.route("/table").post((req, res) => {
  let { veg } = req.body;
  console.log(veg);
  let query = { veg };
  // console.log(vegRequest);
  // console.log(query);
  //var query = { veg: "watermelon" };
  vegSchema
    .find(query)
    .then((query) => res.json(query)) //a promise in .json format of all veg entries
    .catch((err) => res.status(400).json("error: " + err));
});
// router.route("/find").get((req, res) => {
//   vegSchema.find();
// });

module.exports = router; //required for all router files

//testdata used first

// {
//   "veg": "carrot",
//   "name": "anon",
//   "water": "every morning",
//   "pDist": "width of a hand",
//   "gTime": "3 weeks",
//   "sType": "light and loose",
//   "tip1": "they like regularity",
//   "tip2": "random tip here"
// }
