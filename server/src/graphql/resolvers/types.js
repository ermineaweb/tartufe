const resolvers = {

    Game: {
        id: (root) => root.id,
        creator: (root) => root.creator,
        players: (root) => root.players,
        roundMax: (root) => root.roundMax,
        playerMax: (root) => root.playerMax,
        roundDuration: (root) => root.roundDuration,
    },

    Player: {
        id: (root) => root.id,
        username: (root) => root.username,
        creator: (root) => root.creator,
        tartufe: (root) => root.tartufe,
        votes: (root) => root.votes,
        secretWord: (root) => root.secretWord,
        ownWord: (root) => root.ownWord,
    },

};

export default resolvers;
