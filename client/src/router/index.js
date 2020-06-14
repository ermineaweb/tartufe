import React, {useContext} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "../components/Home";
import Board from "../components/Board";
import Stats from "../components/Stats";
import {UserContext} from "../context";


export default function Router() {
    const {user} = useContext(UserContext);

    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/join/:id"} component={Home}/>
                <Route path={"/stats"} component={Stats}/>
                {user.id && user.idGame && <Route path={"/board"} component={Board}/>}
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    )
}