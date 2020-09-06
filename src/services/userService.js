import UserModel from './../models/userModel';

/**
 * Update user
 * @param {userId} id 
 * @param {dataUpdate} item 
 */
let updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
}

module.exports = {
    updateUser: updateUser
}
