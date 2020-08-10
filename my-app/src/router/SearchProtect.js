import React from 'react';
import { toast } from 'react-toastify'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, query, ...rest }) => {
    return (
        <Route {...rest} render={
            props => {
                if (query) {
                    return <Component {...rest} {...props} />
                } else {
                    toast.info('There are no search parameters')
                    return <Redirect to={
                        {
                            pathname: '/not-found',
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