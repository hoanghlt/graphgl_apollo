const resolvers = {
    Query: {
        books: async (parent, args, {mongoDataMethods}) => 
                await mongoDataMethods.getAllBooks(),
        book: async (parent, {id}, {mongoDataMethods}) => 
                await mongoDataMethods.getBookByid(id),
        authors: async (parent, args, {mongoDataMethods}) => 
                await mongoDataMethods.getAllAuthors(),
        author: async (parent, {id}, {mongoDataMethods}) => 
                await mongoDataMethods.getAuthorByid(id)
    },
    Book: {
        author: async ({authorId}, args, {mongoDataMethods}) => 
                await mongoDataMethods.getAuthorByid(authorId)
    },
    Author: {
        books: async ({id}, args, {mongoDataMethods}) => 
                await mongoDataMethods.getAllBooks({ authorId: id })
    },

    //MUTATION
    Mutation: {
        createAuthor: async (parent, args, {mongoDataMethods}) => 
                mongoDataMethods.createAuthor(args),
        createBook: async (parent, args, {mongoDataMethods}) => 
                mongoDataMethods.createBook(args)
    }
}

module.exports = resolvers
