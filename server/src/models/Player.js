import {v4 as uuid} from "uuid";

export default class Player {

    _id;
    _idGame;
    _username;
    _words;
    _ownVote;
    _score;
    _wantVote;
    _validVote;
    _isTartufe;
    _isReady;
    _isWriting;
    _isPlaying;

    constructor(username, idGame) {
        this._id = uuid();
        this._idGame = idGame;
        this._username = username;
        this._words = [];
        this._ownVote = null;
        this._score = 0;
        this._wantVote = false;
        this._validVote = false;
        this._isTartufe = false;
        this._isReady = false;
        this._isWriting = false;
        this._isPlaying = false;
    }

    addWord(word) {
        this._words = [...this._words, word];
        return this;
    }

    get validVote() {
        return this._validVote;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(value) {
        this._isPlaying = value;
    }

    set validVote(value) {
        this._validVote = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get idGame() {
        return this._idGame;
    }

    set idGame(value) {
        this._idGame = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get words() {
        return this._words;
    }

    set words(value) {
        this._words = value;
    }

    get ownVote() {
        return this._ownVote;
    }

    set ownVote(value) {
        this._ownVote = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get wantVote() {
        return this._wantVote;
    }

    set wantVote(value) {
        this._wantVote = value;
    }

    get isTartufe() {
        return this._isTartufe;
    }

    set isTartufe(value) {
        this._isTartufe = value;
    }

    get isReady() {
        return this._isReady;
    }

    set isReady(value) {
        this._isReady = value;
    }

    get isWriting() {
        return this._isWriting;
    }

    set isWriting(value) {
        this._isWriting = value;
    }
}