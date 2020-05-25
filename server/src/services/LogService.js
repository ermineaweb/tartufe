import fs from "fs";

export default class LogService {

    constructor(file) {
        this._file = file;
    }

    saveGame(game) {
        const date = new Date();

        const infos = `{"date":"${date.toISOString()}","mode":"${game.mode}"},\n`;

        fs.appendFile(this._file, infos, (err) => {
            if (err) throw err;
        });
    }

    saveWords(wordPlebe, wordTartufe, word) {
        const infos = `{"wordPlebe":"${wordPlebe}","wordTartufe":"${wordTartufe}","word":"${word}"},\n`;

        fs.appendFile(this._file, infos, (err) => {
            if (err) throw err;
        });
    }

}