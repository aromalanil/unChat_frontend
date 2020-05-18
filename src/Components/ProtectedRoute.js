import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, protectCondition, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => protectCondition
                ? <Component {...props} {...rest}/>
                : <Redirect to="/login" />
            }/>
    )
}

export default ProtectedRoute;
