"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const findByEmail = (email) => {
    return Admin_1.AdminModel.findOne({ email: email, status: true })
        .select("+email +password +roles +verified -status")
        .populate({
        path: "roles",
        match: { status: true },
        select: { code: 1 },
    })
        .exec();
};
exports.default = findByEmail;
//# sourceMappingURL=findByEmail.js.map