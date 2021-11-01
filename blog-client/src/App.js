import './App.css';
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Blog from "./Pages/Blog";
import MyPosts from "./Pages/MyPosts";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path="/"><Home /></Route>
          <Route exact={true} path="/post"><Post /></Route>
          <Route exact={true} path="/register"><Register/></Route>
          <Route exact={true} path="/login"><Login/></Route>
          <Route exact={true} path="/profile"><Profile/></Route>
          <Route exact={true} path="/myposts"><MyPosts/></Route>
          <Route path="/:blogID"><Blog /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
