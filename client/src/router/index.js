import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Games from "../components/Games";
import Rules from "../components/Rules";
import NotFound from "../components/NotFound";
import Menu from "../components/Menu";
import Board from "../components/Board";


export default function Router() {
    return (
        <BrowserRouter>
            <Menu/>
            <Switch>
                <Route path={"/"} exact component={Games}/>
                <Route path={"/board"} exact component={Board}/>
                <Route path={"/rules"} component={Rules}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}