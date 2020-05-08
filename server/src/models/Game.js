import {v4 as uuid} from "uuid";

export default class Game {

    _id;
    _creator;
    _players;
    _round;
    _roundMax;
    _playerMax;
    _roundDuration;

    constructor(creator, roundMax = 3, playerMax = 1, roundTime = 20) {
        this._id = uuid();
        this._creator = creator;
        this._players = [this._creator];
        this._round = 1;
        this._roundMax = roundMax;
        this._playerMax = playerMax;
        this._roundDuration = roundTime;
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
        this._players.slice(index, 1);
    }

    get round() {
        return this._round;
    }

    set round(value) {
        this._round = value;
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

    get creator() {
        return this._creator;
    }

    set creator(value) {
        this._creator = value;
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
}