import React, { useState, useEffect, setState, Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form, Button, Grid, Container } from "react-bootstrap";
import { CSVLink, CSVDownload } from "react-csv";
import Select from "react-select";
import axios from "axios";
import getveg from "./components/getveg.component";
import { array } from "yup";
import { Row, Col } from "react-bootstrap";
//begin with serve -s build -l 3000
//import VegList from "./components/getveg.component";
// function vegget() {
//   setVeg = axios.get("http://68.147.81.130:4000/vegRoute/");
// }
function App() {
  return (
    //<Route path="/Database/getveg" component={getveg} />
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Database">
            <Database />
          </Route>

          <Route path="/Catalogue">
            <Catalogue />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <header className="App-header">
      <Link to="database">
        <img src="vs.png" className="App-logo" alt="logo" />
      </Link>
      <p>Enter VegSyn</p>
    </header>
  );
}

function Catalogue() {
  let [veggie, setVeggie] = useState();
  let [name, setName] = useState(""); //left is what is sent out,
  let [veg, setVeg] = useState("");
  let [water, setWater] = useState("");
  let [pDist, setpDist] = useState("");
  let [gTime, setgTime] = useState("");
  let [sType, setsType] = useState("");
  let [tip1, setTip1] = useState("");
  let [tip2, setTip2] = useState("");

  useEffect(() => {
    axios
      .get("http://68.147.81.130:4000/vegRoute/")
      .then((thisistheentirejson) => {
        const theData = thisistheentirejson.data;
        setVeggie(theData.map((veg) => veg.veg));
      });
    //const setArray = theData.map((veg) => veg.veg);
    //setArray(array);
    //const theVegs = setState(theArray); //useState vs setState?
  });
  // axios.get("http://68.147.81.130:4000/vegRoute/").then((reponse) => {
  //   this.setState({
  //     veg: Response.data.map((veg) => veg.setVeg),
  //     setveg: Response.data[0].setVeg,
  //   });
  // });
  //
  if (veggie == undefined) {
    return null;
  }
  function sortVeggie(item) {
    return { value: item, label: item };
    //return { name: "vegetable", value: item, label: item };
  }
  const options = veggie.map(sortVeggie);
  //
  //
  // const options = [
  //   { value: "carrot", label: "carrot" },
  //   { value: "melon", label: "melon" },
  // ];
  //console.log(options);
  //console.log(veggie);
  //
  // let setName = " ";
  // let setVeg = " ";
  // let setWater = " ";
  // let pDist = " ";
  // let gTime = " ";
  // let sType = " ";
  // let tip1 = " ";
  // let tip2 = " ";

  const handleChange = ({ value, label }, { action, option, name }) => {
    //leaving the default options because i'm terrified to break anything
    console.log({ value, action });
    axios
      .post(`http://68.147.81.130:4000/vegRoute/table`, { veg: value }) //http://68.147.81.130:4000/vegRoute/table?veg=watermelon works in insomnia
      .then((response) => {
        //const theData = thething.data;
        console.log(response);
        let vegData = response.data;
        console.log(vegData);
        //setWater(vegData.water);
        setName(vegData.map((name) => name.name));
        setVeg(vegData.map((veg) => veg.veg));
        setWater(vegData.map((water) => water.water));
        setpDist(vegData.map((pDist) => pDist.pDist));
        setgTime(vegData.map((gTime) => gTime.gTime));
        setsType(vegData.map((sType) => sType.sType));
        setTip1(vegData.map((tip1) => tip1.tip1));
        setTip2(vegData.map((tip2) => tip2.tip2));
        console.log(water);
      });
  };
  return (
    <header className="App-Catalogue">
      <Link to="database">
        <img src="vs.png" className="App-logo-2" alt="logo" />
      </Link>
      <Select options={options} onChange={handleChange} />
      <Container>
        {/* <Row>
          <Col>Category</Col>
          <Col>Information</Col>
        </Row> */}
        <Row>
          <Col>Contributer:</Col>
          <Col style={{ color: "green" }}>{name}</Col>
        </Row>
        <Row>
          <Col>Vegetable:</Col>
          <Col style={{ color: "green" }}>{veg}</Col>
        </Row>
        <Row>
          <Col>Watering Information:</Col>
          <Col style={{ color: "blue" }}>{water}</Col>
        </Row>
        <Row>
          <Col>Planting Distance:</Col>
          <Col style={{ color: "green" }}>{pDist}</Col>
        </Row>
        <Row>
          <Col>Time to grow:</Col>
          <Col style={{ color: "green" }}>{gTime}</Col>
        </Row>
        <Row>
          <Col>Best Soil Type:</Col>
          <Col style={{ color: "green" }}>{sType}</Col>
        </Row>
        <Row>
          <Col>Extra Tips:</Col>
          <Col style={{ color: "green" }}>{tip1}</Col>
        </Row>
        <Row>
          <Col>Extra Tips:</Col>
          <Col style={{ color: "green" }}>{tip2}</Col>
        </Row>
      </Container>
    </header>
  );
}
function Database() {
  const [name, setName] = useState(""); //left is what is sent out,
  const [veg, setVeg] = useState("");
  const [water, setWater] = useState("");
  const [pDist, setpDist] = useState("");
  const [gTime, setgTime] = useState("");
  const [sType, setsType] = useState("");
  const [tip1, setTip1] = useState("");
  const [tip2, setTip2] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name);
    // console.log(veg);
    // console.log(water);
    // console.log(pDist);
    // console.log(gTime);
    // console.log(sType);
    // console.log(tip1);
    // console.log(tip2);
    let formData = { veg, name, water, pDist, gTime, sType, tip1, tip2 };

    //TODO fetch with backend
    //usestate useeffect
    //You use usestate to store the value of your form inputs
    //You create a custom hook to contact your api
    //(there are some examples on internet, or even some libraries),
    //you set your state with onchange event and you submit it with the onSubmit event
    console.log(formData);
    axios.post("http://68.147.81.130:4000/vegRoute/add", formData);
    window.location.reload(false); //due to some bug, the page stopped refreshing on submission, so i added this to do it automatically

    //console.log(formData);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Link to="Catalogue">
          <img src="vs.png" className="App-logo-2" alt="logo" />
        </Link>
        <h1>Contribute to VegBase</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group control="Contributer">
            <Form.Label>Contributer Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anonymous"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="vegName">
            <Form.Label>Vegetable</Form.Label>
            <Form.Control
              type="text"
              placeholder="Carrot"
              value={veg}
              onChange={(e) => setVeg(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="waterTime">
            <Form.Label>Watering Information</Form.Label>
            <Form.Control
              type="text"
              placeholder="Every day, in the morning"
              value={water}
              onChange={(e) => setWater(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="seedSpace">
            <Form.Label>Planting Distance</Form.Label>
            <Form.Control
              type="text"
              placeholder="45cm apart"
              value={pDist}
              onChange={(e) => setpDist(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="growTime">
            <Form.Label>Time to Grow</Form.Label>
            <Form.Control
              type="text"
              placeholder="Two Weeks"
              value={gTime}
              onChange={(e) => setgTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="soilType">
            <Form.Label>Best Soil Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Light and Loose"
              value={sType}
              onChange={(e) => setsType(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="tipOne">
            <Form.Label>Extra tips?</Form.Label>
            <Form.Control
              type="text"
              placeholder="N/A"
              value={tip1}
              onChange={(e) => setTip1(e.target.value)}
            />
          </Form.Group>
          <Form.Group control="tipTwo">
            <Form.Label>Extra Tips?</Form.Label>
            <Form.Control
              type="text"
              placeholder="N/A"
              value={tip2}
              onChange={(e) => setTip2(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </header>
    </div>
  );
}
export default App;
