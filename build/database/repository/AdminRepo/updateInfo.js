"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const updateInfo = (user) => {
    user.updatedAt = new Date();
    return Admin_1.AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
};
exports.default = updateInfo;
//# sourceMappingURL=updateInfo.js.map