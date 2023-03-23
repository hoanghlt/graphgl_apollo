const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')

//Load mongoDataMethods
const mongoDataMethods = require('./data/db')

const connectDb = async () => {
  try{
    await mongoose.connect('mongodb+srv://hoangvt:Hoang2153@graphql.7cyetxe.mongodb.net/GraphQL?retryWrites=true&w=majority');

    console.log('Connected to database')
  } catch (error){
    console.log(error.message)
    process.exit(1)
  }
}

connectDb()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      mongoDataMethods
    })
})

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
