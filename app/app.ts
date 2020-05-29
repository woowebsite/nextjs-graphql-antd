import '@babel/polyfill'
import * as express from 'express'
const next = require('next')

import { sequelize } from './models'
import to from 'await-to-js'
import { ENV } from '../config/env.config'

const dev = process.env.NODE_ENV !== 'production'

const bodyParser = require('body-parser')
const {
    ApolloServer,
    graphqlExpress,
    graphiqlExpress,
} = require('apollo-server-express')
const cors = require('cors')
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(cors())

    const serverApollo = new ApolloServer({
        modules: [
            require('./GraphQL/tickets'),
            require('./GraphQL/status'),
            require('./GraphQL/users'),
            require('./GraphQL/priorities'),
        ],
    })

    serverApollo.applyMiddleware({ server })

    serverApollo.get('/', (req, res) => res.send('Hello World!'))

    serverApollo.all('*', (req, res) => {
        return handle(req, res)
    })

    serverApollo.listen({ port: 5000 }, () =>
        console.log(`🚀 Server ready at http://localhost:5000`),
    )
})
// app.listen({ port: ENV.PORT }, async () => {
//     console.log(`🚀 Server ready at http://localhost:5000`);
//     let err;
//     [err] = await to(sequelize.sync(
//         // {force: true},
//     ));

//     if(err){
//         console.error('Error: Cannot connect to database');
//     } else {
//         console.log('Connected to database');
//     }
// });
