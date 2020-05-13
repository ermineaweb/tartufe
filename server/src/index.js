import 'dotenv/config';
import express from "express";
import path from "path";
import http from "http";
import {ApolloServer, PubSub} from "apollo-server-express";
import {resolvers, schema} from "./graphql";

const app = express();

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    subscriptions: {
        onConnect: async (connectionParams, webSocket) => {
            return connectionParams;
        },
    },
    context: async ({req, res, connection}) => {
        if (connection) {
            return {
                ...connection.context,
                pubsub
            };
        } else {
            return {
                req,
                res,
                pubsub
            };
        }
    },
});

server.applyMiddleware({app, path: "/graphql"});
app.use(express.static(path.resolve("../client/build")));
app.use("/", (req, res) => res.sendFile(path.resolve("../client/build/index.html")));

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: 4000}, () =>
    console.log("Server ready")
);
