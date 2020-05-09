export default class Random {

    static fromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}