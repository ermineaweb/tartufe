import fs from "fs";

export default class LogService {

    constructor(file) {
        this._file = file;
    }

    insert(game) {
        const date = new Date();

        const infos = `{"date":"${date.toISOString()}","mode":"${game.mode}"},`;

        fs.appendFile(this._file, infos, (err) => {
            if (err) throw err;
        });
    }

}