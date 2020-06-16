import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";

import { Home, About, Monument, Monuments, Login } from '../pages'

function AppRouter() {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/monuments/:id" component={Monument} />
      <Route path="/monuments" component={Monuments} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  )
}

export default AppRouter
