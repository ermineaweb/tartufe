import {withFilter} from "graphql-subscriptions";

const resolvers = {

    Subscription: {

        gameUpdated: {
            subscribe: withFilter((root, params, context) => {
                return context.pubsub.asyncIterator(["GAME_UPDATED"])
            }, (payload, variables) => {
                return payload.gameUpdated.id === variables.id;
            })
        },

        gamesUpdated: {
            subscribe: (root, params, context) => {
                return context.pubsub.asyncIterator(["GAMES_UPDATED"])
            },
        },

    },

};

export default resolvers;
