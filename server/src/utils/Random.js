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

    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}