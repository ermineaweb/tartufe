import Repository from "../repository/Repository";

export default class LogService {

    constructor() {
        this._repository = new Repository();
    }

    saveGame(game) {
        const date = new Date();

        const data = {
            date: date.toISOString(),
            scoreMax: game.scoreMax,
            wordsMax: game.wordsMax,
            canSeeVote: game.canSeeVote,
            mode: game.mode,
            players: game.players,
            gameOver: game.isGameOver,
        };

        this._repository.insert("tartufe", "games", data).catch(err => err);
    }

    saveWord(playerWord, gameWord) {
        const data = {
            playerWord: playerWord,
            gameWord: gameWord,
        };

        this._repository.insert("tartufe", "words", data).catch(err => err);
    }

    saveError(err) {
        const date = new Date();

        const data = {
            date: date.toISOString(),
            error: err,
        };

        this._repository.insert("tartufe", "errors", data).catch(err => err);
    }

    saveEvent(event) {
        const date = new Date();

        const data = {
            date: date.toISOString(),
            event: event,
        };

        this._repository.insert("tartufe", "events", data).catch(err => err);
    }

}