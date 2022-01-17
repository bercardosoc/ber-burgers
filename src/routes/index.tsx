import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export const Routes = () => (
    <Switch>
        <Route exact path="/" >
            <Signup/>
        </Route>
        <Route path="/signin" >
            <Signin/>
        </Route>
        <Route path="/dashboard">
            <Dashboard/>
        </Route>
    </Switch>
)