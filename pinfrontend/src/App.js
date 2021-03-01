import React,{useState} from 'react';
import { Button } from 'reactstrap';
import {routes} from "./routes";
import Home from "./Home";
import Main from "./Main";

import {Switch,Route} from "react-router-dom";
import "./App.css"
import Welcome from './Welcome';
function App() {

  return (
    <Switch>
      <Route path={routes.home}>
        <Home></Home>
      </Route>
      <Route path={routes.welcome}>
        <Welcome></Welcome>
      </Route>
      <Route path="/">
        <Main></Main>
      </Route>
    </Switch>
  )
    
}

export default App

