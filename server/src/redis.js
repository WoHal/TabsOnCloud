const Redis = require('ioredis');
const redisConf = require('./config/redis');

module.exports = new Redis(redisConf.server);