import dotenv from "dotenv";
import express from "express";
import path from "path";
import http from "http";
import {ApolloServer} from "apollo-server-express";
import resolvers from "./graphql/resolvers";
import schemas from "./graphql/schemas";
import {PubSub} from 'graphql-subscriptions';

dotenv.config({path: '../env/.env'});

const HOST_HTTP = process.env.HOST_HTTP || "localhost";
const HOST_WS = process.env.HOST_WS || "localhost";
const PORT = process.env.PORT || 4000;
const API_ROUTE = process.env.API_ROUTE || "/graphdql";
const ROUTE = process.env.ROUTE || "/";

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

server.applyMiddleware({app, path: API_ROUTE});

app.use(express.static(path.resolve("../client/build")));

app.use(ROUTE, (req, res) => {
    res.sendFile(path.resolve("../client/build/index.html"))
});

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, () => {
    console.log(`Server  http : http://${HOST_HTTP}:${PORT}${ROUTE}`);
    console.log(`Graphql reqs : http://${HOST_HTTP}:${PORT}${API_ROUTE}`);
    console.log(`Graphql subs : ws://${HOST_WS}:${PORT}${API_ROUTE}`);
});
