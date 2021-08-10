import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Dashboard from '../Pages/Dashboard'
import Login from '../Pages/Login'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Redirect to="/login" />
            </Switch>
        </Router>
     );
}

export default Routes;
