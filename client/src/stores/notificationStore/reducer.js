import {actionsType} from "./actions";

export const initialState = {
    notifications: [],
};

export function reducer(state, action) {

    switch (action.type) {

        case actionsType.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.notification],
            };

        case actionsType.DELETE_ALL_NOTIFICATION:
            return {
                notifications: [],
            };

        default:
            throw new Error("action inconnue : " + action);
    }

}

