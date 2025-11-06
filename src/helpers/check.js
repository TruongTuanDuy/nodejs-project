const mongoose = require('mongoose');
const checkMogooseObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}
module.exports = { checkMogooseObjectId };