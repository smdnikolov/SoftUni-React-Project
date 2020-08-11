import React from 'react';
import { toast } from 'react-toastify'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (user) {
          return <Component {...rest} {...props} />
        } else {
          toast.info('You have to be logged in to view this page')
          return <Redirect to={
            {
              pathname: '/login',
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