import React from "react";
import {NavLink} from "react-router-dom";


export default function Menu() {

    return (
        <div>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/board">Jouer</NavLink>
            <NavLink to="/rules">Règles de jeu</NavLink>
        </div>
    )
}