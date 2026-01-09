const mongoose = require('mongoose');

//Khởi tạo kết nối đến MongoDB
class InitDB {
    constructor() {
        this.start()
    }

    start = () => {
        console.log(process.env.MB_USERNAME);

        mongoose.connect(`mongodb+srv://${process.env.MB_USERNAME}:${process.env.MB_PASSWORD}@cluster0.dy2u4tv.mongodb.net/${process.env.MB_DBNAME}`);
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
