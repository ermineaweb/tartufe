import {v4 as uuid} from "uuid";

export default class Player {

    _id;
    _username;
    _creator;
    _tartufe;
    _ownVote;
    _votes;
    _secretWord;
    _ownWord;
    _score;
    _ready;

    constructor(username, creator) {
        this._id = uuid();
        this._username = username;
        this._creator = !!creator;
        this._tartufe = false;
        this._ownVote = null;
        this._votes = [];
        this._secretWord = "";
        this._ownWord = "";
        this._score = 0;
        this._ready = false;
    }

    get votes() {
        return this._votes;
    }

    set votes(value) {
        this._votes = value;
    }

    get ready() {
        return this._ready;
    }

    set ready(value) {
        this._ready = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get creator() {
        return this._creator;
    }

    set creator(value) {
        this._creator = value;
    }

    get tartufe() {
        return this._tartufe;
    }

    set tartufe(value) {
        this._tartufe = value;
    }

    get ownVote() {
        return this._ownVote;
    }

    set ownVote(value) {
        this._ownVote = value;
    }

    get secretWord() {
        return this._secretWord;
    }

    set secretWord(value) {
        this._secretWord = value;
    }

    get ownWord() {
        return this._ownWord;
    }

    set ownWord(value) {
        this._ownWord = value;
    }
}