import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export default function Games({games, subscribe}) {

    // useEffect(() => {
    //     subscribe();
    // }, [subscribe]);

    return (
        <>
            Games
            {games && games.map((game) =>
                <div key={game.id}>
                    <p>
                        <Link to={{
                            pathname: "/board",
                            state: {idGame: game.id}
                        }}>joindre</Link> - Créateur : {game.players.find(p => p.creator).username}
                    </p>
                    <input type={"text"} value={game.id} readOnly={true}/>
                </div>
            )}
        </>
    )
}