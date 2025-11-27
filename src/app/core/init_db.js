const mongoose = require('mongoose');

//Khởi tạo kết nối đến MongoDB
class InitDB {
    constructor() {
        this.start()
    }

    start = () => {
        mongoose.connect('mongodb+srv://project-nodejs:11111118@cluster0.dy2u4tv.mongodb.net/shop');
        mongoose.connection
            .once('open', function () {
                console.log('MongoDB running');
            })
            .on('error', function (err) {
                console.log(err);
            });
    }
}
module.exports = new InitDB();
