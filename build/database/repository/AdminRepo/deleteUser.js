"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const deleteUser = async (user) => {
    user.updatedAt = new Date();
    let email = user.email;
    let regex = "^old[0-9]+" + email;
    const deletedUsers = await Admin_1.AdminModel.count({ email: { $regex: regex } });
    return Admin_1.AdminModel.findByIdAndUpdate(user._id, { $set: { email: `old${deletedUsers}${email}`, deletedAt: Date.now() } }, { new: true }).exec();
};
exports.default = deleteUser;
//# sourceMappingURL=deleteUser.js.map