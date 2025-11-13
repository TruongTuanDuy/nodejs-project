const mongoose = require('mongoose');

//Kiểm tra xem id có đúng định dạng ObjectId của mongoose không
const checkMogooseObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}
module.exports = { checkMogooseObjectId };