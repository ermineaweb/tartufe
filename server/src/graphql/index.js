import fs from "fs";
import {gql} from "apollo-server-express";
import resolvers from "./resolvers";

const queries = fs.readFileSync(__dirname.concat("/queries.graphql"), "utf8");
const mutations = fs.readFileSync(__dirname.concat("/mutations.graphql"), "utf8");
const subscriptions = fs.readFileSync(__dirname.concat("/subscriptions.graphql"), "utf8");
const typeDefs = fs.readFileSync(__dirname.concat("/typeDefs.graphql"), "utf8");
const schema = gql(queries + mutations + subscriptions + typeDefs);

export {
    resolvers,
    schema,
};
