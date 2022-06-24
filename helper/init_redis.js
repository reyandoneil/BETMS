const redis = require('redis');

const client = redis.createClient({
  port: 6379,
  host: 'localhost',
});
client.on('connect', () => console.log('Connected to Redis!'));
client.on('ready', () =>
  console.log('Connect and Ready to use Redis!')
);
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('end', () => console.log('Disconnected to Redis'));

client.connect();

module.exports = client;
