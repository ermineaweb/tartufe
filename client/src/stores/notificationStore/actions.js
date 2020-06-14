export const actionsType = {
    ADD_NOTIFICATION: "addNotification",
    DELETE_ALL_NOTIFICATION: "deleteAllNotification",
};

export const addNotification = ({notification}) => ({
    type: actionsType.ADD_NOTIFICATION,
    notification,
});

export const deleteAllNotification = () => ({
    type: actionsType.DELETE_ALL_NOTIFICATION,
});