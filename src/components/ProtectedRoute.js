import { Route } from "react-router-dom"
import React from "react"
import { CurrentUserContext } from "../contexts/currentUserContext"

const ProtectedRoute = ({component: Component, ...props}) => {
    const value = React.useContext(CurrentUserContext)
    return (
        <Route>
            {() => 
                value.isLoggedIn ? <Component {...props}/> : console.log('Wrong')
            }
        </Route>
    )
}

export default ProtectedRoute