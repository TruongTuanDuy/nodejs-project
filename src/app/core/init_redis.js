

//Khởi tạo kết nối đến Redis
const redis = require('redis');

const redisClient = redis.createClient({
    url: 'redis://localhost:6379' // Thay đổi URL nếu cần
});

redisClient.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.error('Could not connect to Redis', err);
    });


module.exports = redisClient;