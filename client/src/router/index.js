import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Games from "../components/Games";
import Rules from "../components/Rules";
import NotFound from "../components/NotFound";
import Menu from "../components/Menu";
import Home from "../components/Home";
import Board from "../components/Board";


export default function Router() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/board"} component={Board}/>
                <Route path={"/rules"} component={Rules}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}