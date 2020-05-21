import dotenv from "dotenv";
import express from "express";
import path from "path";
import http from "http";
import {ApolloServer} from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import schemas from "./graphql/schemas";
import {PubSub} from 'graphql-subscriptions';

dotenv.config({path: '../env/.env'});
const PORT = process.env.PORT || 4000;
const API_PATH = "/" + process.env.API_PATH || "/graphdql";
const PATH = "/" + process.env.PATH || "/";

const app = express();

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
            return connectionParams;
        },
    },
    context: async ({req, res, connection}) => {
        if (connection) {
            return {...connection.context, pubsub};
        } else {
            return {req, res, pubsub};
        }
    },
});

server.applyMiddleware({app, path: API_PATH});

app.use(express.static(path.resolve("../client/build")));

app.use(PATH, (req, res) => res.sendFile(path.resolve("../client/build/index.html")));

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, () =>
    console.log("Server ready")
);
