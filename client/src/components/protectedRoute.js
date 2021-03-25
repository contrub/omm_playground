import React from 'react';
import { Route } from 'react-router-dom';
import {Redirect} from "react-router";

const ProtectedRoute = ({ component: Component, userRole, requiredRole, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (userRole === requiredRole) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/forbidden',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
