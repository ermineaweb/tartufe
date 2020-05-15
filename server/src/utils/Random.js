export default class Random {

    static fromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static numberMinAndMaxIncluded(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static numberMaxExcluded(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static flipCoin() {
        return (Math.floor(Math.random() * 2) === 0);
    }

}