import LogService from "../services/LogService";

const logService = new LogService();

export default function checkError(condition, msg) {
    if (condition) {
        logService.saveError(msg);
        throw new Error(msg);
    }
}