"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const findByObj = (obj) => {
    return Admin_1.AdminModel.findOne(obj)
        .select('+roles +email')
        .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
    })
        .exec();
};
exports.default = findByObj;
//# sourceMappingURL=findbyObj.js.map