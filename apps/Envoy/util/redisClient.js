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

function refreshTokenExists(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HEXISTS(slackEmail, 'refreshToken', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function accessTokenExists(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HEXISTS(slackEmail, 'accessToken', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getAll(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HGETALL(slackEmail, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getRefreshToken(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HGET(slackEmail, 'refreshToken', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getRefreshExp(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HGET(slackEmail, 'refreshTokenExp', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getAccessExp(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HGET(slackEmail, 'accessTokenExp', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

function getAccessToken(slackEmail) {
  return new Promise((resolve, reject) => {
    redisClient.HGET(slackEmail, 'accessToken', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

module.exports = { redisClient, 
  refreshTokenExists, 
  accessTokenExists,
  getAll, 
  getRefreshToken, 
  getAccessToken, 
  getRefreshExp,
  getAccessExp 
};