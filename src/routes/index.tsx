import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";

export const Routes = () => (
    <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route path="/signup" >
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