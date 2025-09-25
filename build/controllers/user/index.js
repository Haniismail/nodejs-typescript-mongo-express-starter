"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_controller_1 = require("./create.controller");
const getAll_controller_1 = require("./getAll.controller");
const getOne_controller_1 = require("./getOne.controller");
const update_controller_1 = require("./update.controller");
const remove_controller_1 = require("./remove.controller");
const profileController_1 = require("./profileController");
exports.default = {
    createUser: create_controller_1.createUser,
    getAllUsers: getAll_controller_1.getAllUsers,
    getUser: getOne_controller_1.getUser,
    updateUser: update_controller_1.updateUser,
    removeUser: remove_controller_1.removeUser,
    getMyProfile: profileController_1.getMyProfile,
    updateProfile: profileController_1.updateProfile,
};
//# sourceMappingURL=index.js.map