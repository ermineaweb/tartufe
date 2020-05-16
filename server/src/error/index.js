export default function checkError(condition, msg) {
    if (condition) {
        console.log(Date.now() + ":" + msg);
        throw new Error(msg);
    }
}