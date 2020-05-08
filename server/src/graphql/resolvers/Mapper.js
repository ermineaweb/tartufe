export default class Mapper {

    static mapString(data) {
        return data && data.toString();
    }

    static mapFloat(data) {
        return data && parseFloat(data);
    }

    static mapInt(data) {
        return data && parseInt(data);
    }

}


