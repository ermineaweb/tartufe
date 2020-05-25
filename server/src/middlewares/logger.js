import fs from "fs";

function logger(err, req, res, next) {
    if (err) {
        fs.appendFile('errors.log', err, (err) => {
            if (err) throw err;
        });
    }
}