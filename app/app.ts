import '@babel/polyfill'
import * as express  from 'express';
import { sequelize } from './models';
import to from 'await-to-js';
import { ENV } from '../config/env.config';

const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
    modules: [
        require('./GraphQL/tickets'),
        require('./GraphQL/status'),
        require('./GraphQL/users'),
        require('./GraphQL/priorities'),
    ],
})

server.applyMiddleware({ app })

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)

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

