const jwt = require('jsonwebtoken');
const permissionService = require('../../services/permission_service');
const user_service = require('../../services/user_service');

async function checkPermission(req, res, next) {
    let permission = await permissionService.getItemByParams({ router: req.baseUrl, method: req.method });
    console.log(permission._id);

    let user = await user_service.getUserById(req.userId);
    console.log(user.group_user.permission_ids);

    if (user.group_user.permission_ids.includes(permission._id)) {
        next();
    } else {
        res.status(401).send({
            message: "Not permission",
        });
    }
};
module.exports = { checkPermission };