const resolvers = {

    Game: {
        id: (root) => root.id,
        players: (root) => root.players,
        round: (root) => root.round,
        roundMax: (root) => root.roundMax,
        playerMax: (root) => root.playerMax,
        roundDuration: (root) => root.roundDuration,
        timer: (root) => root.timer,
        isGameStarted: (root) => root.isGameStarted,
        isVoteStarted: (root) => root.isVoteStarted,
        isGameOver: (root) => root.isGameOver,
    },

    Player: {
        id: (root) => root.id,
        idGame: (root) => root.idGame,
        username: (root) => root.username,
        words: (root) => root.words,
        secretWord: (root) => root.secretWord,
        ownVote: (root) => root.ownVote,
        score: (root) => root.score,
        wantVote: (root) => root.wantVote,
        isCreator: (root) => root.isCreator,
        isTartufe: (root) => root.isTartufe,
        isReady: (root) => root.isReady,
        isWriting: (root) => root.isWriting,
    },

};

export default resolvers;
