"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const countAll = async () => {
    return await Admin_1.AdminModel.find({
        deletedAt: null,
    }).countDocuments();
};
exports.default = countAll;
//# sourceMappingURL=countAll.js.map