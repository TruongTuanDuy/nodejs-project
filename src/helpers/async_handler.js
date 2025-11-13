//Xử lý bắt lỗi cho các hàm async trong route
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = { asyncHandler }
