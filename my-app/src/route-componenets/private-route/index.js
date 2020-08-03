import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../../Store'


function PrivateRoute({ component: RouteComponenet, ...rest }) {
    const [user] = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!user
                    ? (<RouteComponenet {...routeProps} />)
                    : (<Redirect to='/login' />)
            }
        />
    )
}
export default PrivateRoute