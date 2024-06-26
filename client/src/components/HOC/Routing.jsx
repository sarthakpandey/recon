import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Home";
import Dashboard from "../Dashboard.jsx";
import Register from "../Register";
import CreateProfile from "../CreateProfile";
import Navbar from "../Elements/Navbar";
import UsersList from "../UsersList";
import ViewProfile from "../ViewProfile";
import ManageConnections from "../ManageConnections";

const PrivateRoute = ({ path, component: Component, user, ...props }) => {
  if (user)
    return (
      <Route
        {...props}
        to={path}
        render={() => (
          <>
            <Navbar />
            <Component {...props} user={user} />
          </>
        )}
      />
    );
  return <Redirect to="/" />;
};

const Routing = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} user={user} />
        <PrivateRoute
          path="/create-profile"
          component={CreateProfile}
          user={user}
        />
        <PrivateRoute path="/users" component={UsersList} user={user} />
        <PrivateRoute
          path="/profile/:userId"
          component={ViewProfile}
          user={user}
        />
        <PrivateRoute
          path="/connections"
          component={ManageConnections}
          user={user}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routing;
