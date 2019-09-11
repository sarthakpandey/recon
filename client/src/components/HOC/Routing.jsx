import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Home";
import Dashboard from "../Dashboard.jsx";

const PrivateRoute = ({ path, component: Component, user, ...props }) => {
  if (user) return <Component />;
  return <Redirect to="/" />;
};

const Routing = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} user={user} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;