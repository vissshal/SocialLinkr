import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, AppBar, Grow } from "@material-ui/core";
import Navbar from "../src/components/Navbar/Navbar";
import useStyles from "./styles";
import Home from "../src/components/Home/Home";

import Auth from "../src/components/Auth/Auth";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default App;
