"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const findProfileById = (id) => {
    return Admin_1.AdminModel.findOne({ _id: id, status: true })
        .select('+name +lastname +roles +email')
        .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
    })
        .exec();
};
exports.default = findProfileById;
//# sourceMappingURL=findProfileById.js.map