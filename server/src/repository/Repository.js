import {MongoClient, ObjectId} from "mongodb";
import dotenv from "dotenv";

dotenv.config({path: '../../env/.env'});

let instance = null;

export default class Repository {

    constructor() {
        if (instance === null) {
            this._mongoclient = MongoClient;
            this._uri = process.env.DB_ADDR || "mongodb://localhost:27017";
            instance = this;
        }
        return instance;
    }

    insert(dbName, collection, data) {
        return new Promise((resolve, reject) => {
            this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
                .then(client => {
                    client.db(dbName)
                        .collection(collection)
                        .insertOne(data)
                        .then(result => resolve(result.ops[0]))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    update(dbName, collection, data) {
        const {id} = data;
        const query = "";
        this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
            .then(client => {
                client.db(dbName)
                    .collection(collection)
                    .findOneAndUpdate({_id: ObjectId(id).valueOf()}, {$set: query})
                    .then(res => console.log(res))
                    .catch(err => err);
            })
            .catch(err => err);
    }

    getAll(dbName, collection) {

        return new Promise((resolve, reject) => {
            this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
                .then(client => {
                    client.db(dbName)
                        .collection(collection)
                        .find({}).toArray()
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    getById(dbName, collection, id) {
        const searchOptions = {_id: id};
        return new Promise((resolve, reject) => {
            this._mongoclient.connect(this._uri, {useUnifiedTopology: true})
                .then(client => {
                    client.db(dbName)
                        .collection(collection)
                        .findOne(searchOptions, {})
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

}