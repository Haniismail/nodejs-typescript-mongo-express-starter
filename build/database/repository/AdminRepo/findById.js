"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const findById = (id) => {
    return Admin_1.AdminModel.findOne({ _id: id, status: true })
        .select('+email +password +roles +_id')
        .populate({
        path: 'roles',
        match: { status: true },
    })
        .exec();
};
exports.default = findById;
//# sourceMappingURL=findById.js.map