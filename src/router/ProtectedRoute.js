import React from 'react';
import { toast } from 'react-toastify'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (!user) {
          return <Component {...rest} {...props} />
        } else if (user && !localStorage.getItem('loggingIn')) {
          toast.info('You are already logged in')
          return <Redirect to={
            {
              pathname: '/profile',
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