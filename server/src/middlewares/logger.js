import LogService from "../services/LogService";

const logService = new LogService();

function logger(err, req, res, next) {
    if (err) {
        logService.saveError(err);
    }
}