import {v4 as uuid} from "uuid";

export default class Game {

    _id;
    _players;
    _round;
    _roundMax;
    _playerMax;
    _roundDuration;
    _timer;
    _isGameStarted;
    _isVoteStarted;
    _isGameOver;

    constructor(roundMax = 3, playerMax = 1, roundDuration = 20) {
        this._id = uuid();
        this._players = [];
        this._round = 1;
        this._roundMax = roundMax;
        this._playerMax = playerMax;
        this._roundDuration = roundDuration;
        this._timer = roundDuration;
        this._isGameStarted = false;
        this._isVoteStarted = false;
        this._isGameOver = false;
    }

    addPlayer(player) {
        if (this._players.some(p => p.username === player.username)) {
            throw new Error("Le pseudo est déjà pris dans cette partie !");
        }

        if (this._players.length === this._playerMax) {
            throw new Error("La partie est pleine !");
        }

        this._players = [...this._players, player];
        return this;
    }

    removePlayer(player) {
        const index = this._players.findIndex(p => p.id === player.id);
        this._players.splice(index, 1);
    }

    get timer() {
        return this._timer;
    }

    set timer(value) {
        this._timer = value;
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

    get roundDuration() {
        return this._roundDuration;
    }

    set roundDuration(value) {
        this._roundDuration = value;
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