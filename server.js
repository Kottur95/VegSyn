//begin with nodemon start
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs"); //unused

require("dotenv").config();

//creates express server
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.json()); //allows parsing of json

const uri = process.env.ATLAS_URI; //connects to atlas dashboard
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}); //newurlparser is for some new mongodb tool, same for createindex and unified topology. cli directly says to use these options
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connection works"); //confirms connection is connected in console
});

const router = require("./route/vegRoute");
//const loadRoute = require("./route/loadroute");
app.use("/vegRoute", router);
//app.use("/loadRoute", loadRoute);

//starts the server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
