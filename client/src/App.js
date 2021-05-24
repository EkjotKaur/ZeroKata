// import logo from './logo.svg';
// import './App.css';

import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
// import Game from "../../../client/src/components/Game/Game";
import { initialState, reducer } from "./reducers/userReducer";

import "./App.css";

import Game from "./components/Game";
import Join from "./components/Join";
import Home from "./components/HomePage";

export const UserContext = createContext();

const Routing = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const room = JSON.parse(localStorage.getItem("room"));

    if (user && room) {
      dispatch({ type: "USER", payload: { user: user, room: room } });
    }
  }, [dispatch]);

  let routes;

  if (state) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/join" exact component={Join} />
        <Route path="/game" component={Game} />
        <Redirect to="/join" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/join" exact component={Join} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return routes;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="appOuterContainer">
        <Router>
          <Routing />
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
