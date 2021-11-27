require('dotenv').config();

const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const sessionParser = session({
  name: 'sid',
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
});

module.exports = sessionParser;
