"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const Role_1 = require("../../model/Role");
const ApiError_1 = require("../../../core/ApiError");
const create = async (user, roleCode, verified) => {
    const now = new Date();
    const role = await Role_1.RoleModel.findOne({ code: roleCode }).lean().exec();
    if (!role)
        throw new ApiError_1.InternalError('Role must be defined');
    user.roles = [role._id];
    user.verified = verified ? true : false;
    user.createdAt = user.updatedAt = now;
    const createdUser = (await Admin_1.AdminModel.create(user)).populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
    });
    return createdUser;
};
exports.default = create;
//# sourceMappingURL=create.js.map