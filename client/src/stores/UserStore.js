import React, {createContext, useState} from "react";


export default function UserContextProvider(props) {

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}
