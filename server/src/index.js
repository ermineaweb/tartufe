import 'dotenv/config';
import path from "path";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {resolvers, schema} from "./graphql";

const app = express();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({app, path: "/graphql"});

app.use(express.static(path.resolve("../client/build")));

app.use("/", (req, res) => res.sendFile(path.resolve("../client/build/index.html")));

app.listen({port: 4000}, () =>
    console.log("Server ready")
);
