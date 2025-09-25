"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../model/User");
const findById = (id) => {
    return User_1.UserModel.findById(id).populate({ path: "roles" }).exec();
};
exports.default = findById;
//# sourceMappingURL=getOneById.js.map