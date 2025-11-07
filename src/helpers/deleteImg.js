const fs = require('fs/promises');

function deleteImg(path) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('Delete image successfully');
    });
};

function deleteMultiImg(array) {
    for (let index = 0; index < array.length; index++) {
        const path = array[index].path;
        fs.unlink(path, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return;
            }
            console.log('Delete image successfully');
        });
    }

};

module.exports = {
    deleteImg, deleteMultiImg
}