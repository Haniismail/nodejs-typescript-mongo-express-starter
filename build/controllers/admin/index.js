"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createAdmin_controller_1 = require("./createAdmin.controller");
const deleteAdmin_controller_1 = require("./deleteAdmin.controller");
const getAdmin_controller_1 = require("./getAdmin.controller");
const updateAdmin_controller_1 = require("./updateAdmin.controller");
const getAllAdmins_controller_1 = require("./getAllAdmins.controller");
const getAllNonAdmins_controller_1 = require("./getAllNonAdmins.controller");
const getMe_1 = require("../admin/auth/getMe");
exports.default = {
    createAdmin: createAdmin_controller_1.createAdmin,
    deleteAdmin: deleteAdmin_controller_1.deleteAdmin,
    getAdmin: getAdmin_controller_1.getAdmin,
    updateAdmin: updateAdmin_controller_1.updateAdmin,
    getAllAdmins: getAllAdmins_controller_1.getAllAdmins,
    getAllNonAdmins: getAllNonAdmins_controller_1.getAllNonAdmins,
    getMyProfile: getMe_1.getMyProfile,
};
//# sourceMappingURL=index.js.map