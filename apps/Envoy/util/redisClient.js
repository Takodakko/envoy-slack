const { createClient } = require('redis');
let redisClient = {};

redisClient = createClient({ 
  legacyMode: true,
  host: 'localhost',
  port: 6379
})

redisClient.connect().then(() => {
  console.log("Successfully connected to Redis");
}).catch((err) => {
  console.log("Failed to connect to Redis\n" + err) 
})

module.exports = { redisClient };