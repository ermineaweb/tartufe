const resolvers = {

    Game: {
        id: (root) => root.id,
        creator: (root) => root.creator,
        players: (root) => root.players,
        roundMax: (root) => root.roundMax,
        playerMax: (root) => root.playerMax,
        roundDuration: (root) => root.roundDuration,
        gameStarted: (root) => root.gameStarted,
        timer: (root) => root.timer,
        gameOver: (root) => root.gameOver,
    },

    Player: {
        id: (root) => root.id,
        username: (root) => root.username,
        creator: (root) => root.creator,
        tartufe: (root) => root.tartufe,
        ownVote: (root) => root.ownVote,
        secretWord: (root) => root.secretWord,
        ownWord: (root) => root.ownWord,
        score: (root) => root.score,
        ready: (root) => root.ready,
    },

};

export default resolvers;
