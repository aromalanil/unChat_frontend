import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, redirectTo, protectCondition, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => protectCondition
                ? <Component {...props} {...rest} />
                : <Redirect to={redirectTo} />
            } />
    )
}

export default ProtectedRoute;
