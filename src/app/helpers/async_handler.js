//Xử lý bắt lỗi cho các hàm async trong route (thay vì dùng try catch từng hàm trong service, controller)
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); //nếu lỗi thì next cái error qua app.js xử lý
    };
};

module.exports = { asyncHandler }
