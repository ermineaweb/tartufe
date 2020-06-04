import {v4 as uuid} from "uuid";

export default class Game {

    _id;
    _players;
    _round;
    _roundMax;
    _scoreMax;
    _playerMax;
    _wordsMax;
    _wordPlebe;
    _wordTartufe; // for mode 2
    _isGameStarted;
    _isVoteStarted;
    _isGameOver;
    _mode;
    _canSeeVote;

    constructor(roundMax = 0, playerMax = 1, scoreMax = 0, wordsMax = 2, mode = 1, canSeeVote = true) {
        this._id = uuid();
        this._players = [];
        this._round = 1;
        this._roundMax = roundMax;
        this._scoreMax = scoreMax;
        this._playerMax = playerMax;
        this._wordsMax = wordsMax;
        this._wordPlebe = "";
        this._wordTartufe = "";
        this._isGameStarted = false;
        this._isVoteStarted = false;
        this._isGameOver = false;
        this._mode = mode;
        this._canSeeVote = canSeeVote;
    }

    addPlayer(player) {
        if (this._players.some(p => p.username === player.username)) {
            throw new Error("Le pseudo est déjà pris dans cette partie !");
        }

        if (this._players.length === this._playerMax) {
            throw new Error("La partie est pleine !");
        }

        this._players = [...this._players, player];
        return player;
    }

    removePlayer(player) {
        const index = this._players.findIndex(p => p.id === player.id);
        this._players.splice(index, 1);
        return this;
    }

    get canSeeVote() {
        return this._canSeeVote;
    }

    set canSeeVote(value) {
        this._canSeeVote = value;
    }

    get wordTartufe() {
        return this._wordTartufe;
    }

    set wordTartufe(value) {
        this._wordTartufe = value;
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        this._mode = value;
    }

    get wordsMax() {
        return this._wordsMax;
    }

    set wordsMax(value) {
        this._wordsMax = value;
    }

    get scoreMax() {
        return this._scoreMax;
    }

    set scoreMax(value) {
        this._scoreMax = value;
    }

    get wordPlebe() {
        return this._wordPlebe;
    }

    set wordPlebe(value) {
        this._wordPlebe = value;
    }

    get roundMax() {
        return this._roundMax;
    }

    set roundMax(value) {
        this._roundMax = value;
    }

    get playerMax() {
        return this._playerMax;
    }

    set playerMax(value) {
        this._playerMax = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }

    get round() {
        return this._round;
    }

    set round(value) {
        this._round = value;
    }

    get isGameStarted() {
        return this._isGameStarted;
    }

    set isGameStarted(value) {
        this._isGameStarted = value;
    }

    get isVoteStarted() {
        return this._isVoteStarted;
    }

    set isVoteStarted(value) {
        this._isVoteStarted = value;
    }

    get isGameOver() {
        return this._isGameOver;
    }

    set isGameOver(value) {
        this._isGameOver = value;
    }
}