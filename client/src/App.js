import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import ProfilePage from "./components/profile/Profile";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Mallanna&display=swap');
      </style>
    </>
  );
}

export default App;
