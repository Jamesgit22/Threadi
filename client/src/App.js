import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import ProfilePage from "./components/profile/Profile";
import Home from "./components/home/Home";
import "./App.css";
import SearchBar from "./components/search/Search";
import Login from "./components/login/Login";


function App() {
  return (
    <>
    <Nav />
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SearchBar />
            <Home />
          </Route>
          <Route exact path="/login">
          <Login />
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
