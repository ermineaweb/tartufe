import {v4 as uuid} from "uuid";

export default class Player {

    _id;
    _username;
    _creator;
    _tartufe;
    _votes;
    _secretWord;
    _ownWord;

    constructor(username, creator) {
        this._id = uuid();
        this._username = username;
        this._creator = !!creator;
        this._tartufe = false;
        this._votes = 0;
        this._secretWord = "";
        this._ownWord = "";
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

    get votes() {
        return this._votes;
    }

    set votes(value) {
        this._votes = value;
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