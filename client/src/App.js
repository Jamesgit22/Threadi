import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import ProfilePage from "./components/profile/Profile";
import "./App.css";


function App() {
  return (
    <>
    <Nav />
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
