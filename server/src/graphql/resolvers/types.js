const resolvers = {

    Game: {
        id: (root) => root.id,
        players: (root) => root.players,
        round: (root) => root.round,
        roundMax: (root) => root.roundMax,
        scoreMax: (root) => root.scoreMax,
        playerMax: (root) => root.playerMax,
        wordsMax: (root) => root.wordsMax,
        isGameStarted: (root) => root.isGameStarted,
        isVoteStarted: (root) => root.isVoteStarted,
        isGameOver: (root) => root.isGameOver,
        wordPlebe: (root) => root.wordPlebe,
        wordTartufe: (root) => root.wordTartufe,
        mode: (root) => root.mode,
    },

    Player: {
        id: (root) => root.id,
        idGame: (root) => root.idGame,
        username: (root) => root.username,
        words: (root) => root.words,
        ownVote: (root) => root.ownVote,
        score: (root) => root.score,
        wantVote: (root) => root.wantVote,
        validVote: (root) => root.validVote,
        isTartufe: (root) => root.isTartufe,
        isReady: (root) => root.isReady,
        isWriting: (root) => root.isWriting,
        isPlaying: (root) => root.isPlaying,
    },

};

export default resolvers;
