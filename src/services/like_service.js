const handlerFindObj = require('../app/helpers/find_obj');
const LikeModel = require('../models/like_model');

class LikeService {

    addLike = async (commentId, userId) => {
        console.log(commentId, userId);

        // await LikeModel.create(data)
    };

    getAllLike = async (query) => {
        const { findObj, sortObj, skip, page, limit } = handlerFindObj(query);

        let count = await LikeModel.find(findObj).countDocuments();
        let data = await LikeModel.find(findObj).sort(sortObj).skip(skip).limit(limit);
        return {
            page,
            limit,
            total: count,
            data,
        };
    };

    getLikeById = async (id) => {
        let data = await LikeModel.findById(id)
        return data
    };

    getLikeByParams = async (params) => {
        let data = await LikeModel.findOne(params);
        return data;
    }

    deleteLikeById = async (id) => {
        await LikeModel.findByIdAndDelete(id)
    };

    editLikeById = async (id, obj) => {
        await LikeModel.findByIdAndUpdate(id, obj)
    };
}
module.exports = new LikeService();