import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import Board from "../components/Board";


export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/board"} component={Board}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    )
}