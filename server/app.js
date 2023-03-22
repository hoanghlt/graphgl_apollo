const express = require('express')
const { ApolloServer } = require('apollo-server-express')

//Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});