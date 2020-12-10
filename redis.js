
var Redis = require('ioredis')
const redisConfig = {
    port: process.env.REDIS_PORT, // Redis port
    host: process.env.REDIS_HOST, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: process.env.REDIS_PASSWORD,
    db: 0,
    tls: process.env.NODE_ENV=="LOCAL" ?  null : process.env.REDIS_HOST,

}
var client = new Redis(redisConfig);
var subscriber = new Redis(redisConfig);

var opts = {
    prefix: process.env.REDIS_PREFIX,
    createClient: function (type) {
        switch (type) {
        case 'client':
            return client;
        case 'subscriber':
            return subscriber;
        case 'bclient':
            return new Redis(redisConfig);
        default:
            throw new Error('Unexpected connection type: ', type);
        }
    },
    defaultJobOptions : {
        delay: 0,
        removeOnComplete : true ,
        removeOnFail : true ,
    }
}
module.exports = opts
