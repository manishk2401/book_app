import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function App() {
  const [loginUser, setLoginUser] = useState({});

  if (!loginUser._id && localStorage.getItem("logedIn") !== null) {
    setLoginUser(JSON.parse(localStorage.getItem("logedIn")));
  }

  const setUser = (e) => {
    setLoginUser(e);
    axios
      .post("http://localhost:9002/updateusername", e)
      .then(function (response) {
        localStorage.setItem("logedIn", JSON.stringify(e));
        alert(response.data.message);
      })
      .catch(function (error) {
        alert(error.data.message);
        console.log(error);
      });
  };

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Homepage curUser={loginUser} userUpdateToApp={setUser} />
        </Route>

        <Route path="/">
          <Login setLoginUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setLoginUser={setUser} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
