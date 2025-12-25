//Tạo đối tượng tìm kiếm và sắp xếp từ query
let handlerFindObj = (query) => {
    const { productId, userId, price, is_special = false, sortField = 'createdAt', sortDir = "desc", findField = 'name', findValue, status, page = 1, limit = 50 } = query

    let findObj = {};
    let sortObj = {};
    const skip = (page - 1) * limit;

    if (status == 'active' || status == 'inactive') {
        findObj = {
            ...findObj,
            status
        }
    };

    if (productId) {
        findObj = {
            ...findObj,
            productId: productId
        }
    };

    if (is_special == 'true') {
        findObj = {
            ...findObj,
            is_special: true
        }
    };

    if (price) {
        let [min, max] = price.split(",");
        findObj = {
            ...findObj,
            price: { $gte: min, $lte: max }
        }
    };

    if (findValue) {
        findObj[findField] = new RegExp(findValue, 'i');
    };

    if (sortField) {
        sortObj[sortField] = sortDir;
    };

    if (userId) {
        findObj['userId'] = userId;
    };
    return { findObj, sortObj, skip, page, limit };
}
module.exports = handlerFindObj;