const resolvers = {

    Game: {
        id: (root) => root.id,
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
        idGame: (root) => root.idGame,
        username: (root) => root.username,
        creator: (root) => root.creator,
        tartufe: (root) => root.tartufe,
        ownVote: (root) => root.ownVote,
        secretWord: (root) => root.secretWord,
        words: (root) => root.words,
        score: (root) => root.score,
        ready: (root) => root.ready,
        wantVote: (root) => root.wantVote,
    },

};

export default resolvers;
