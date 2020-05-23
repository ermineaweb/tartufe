import mongodb from "mongodb";

export default class LogRepository {

    constructor(model) {
        this._mongoclient = mongodb.MongoClient;
        this._uri = "mongodb://localhost"
        this._model = model;
    }

    save(data) {
        this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
            .then(client => {
                client.db('test')
                    .collection(this._model)
                    .insertOne(data)
                    .catch(err => err);
            })
            .catch(err => err);
    }

    getAll() {
        this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
            .then(client => {
                client.db('test')
                    .collection(this._model)
                    .find({}).toArray()
                    .then(res => console.log(res))
                    .catch(err => err);
            })
            .catch(err => err);
    }

}