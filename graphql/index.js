import express from "express";
import GraphQLHTTP from "express-graphql";
import schema from "./schema";
const { maskErrors } = require('graphql-errors');
import jwt from 'jsonwebtoken';

const SECRET = 'asldfk345lkj4ltkjlqw45kjt2254ktjalkj3560110010';

const port = 5000;
const app = express();

const addUser = async req => {
  const token = req.headers['authorization'];
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
  } catch (e) {
    console.log('No User');
  }
  req.next();
};

const Chalk = require('chalk');
const cors = require('cors');

app.use(addUser);

app.use('/graphi',express.static(`${__dirname}/public`)); // we could have just used the `graphiql` option: https://github.com/graphql/express-graphql

maskErrors(schema);

app.use('/graphql', cors(), GraphQLHTTP(req => ({
  schema: schema,
  graphiql: true,
  context: {
    user: req.user,
    SECRET,
  },
})));
app.listen(port);

console.log(`Started on ${Chalk.underline.blue(`http://localhost:${port}/`)}`);