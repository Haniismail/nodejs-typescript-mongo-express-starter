"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const KeystoreRepo_1 = __importDefault(require("../KeystoreRepo"));
const update = async (user, accessTokenKey, refreshTokenKey) => {
    user.updatedAt = new Date();
    await Admin_1.AdminModel.updateOne({ _id: user._id }, { $set: { ...user } })
        .lean()
        .exec();
    const keystore = await KeystoreRepo_1.default.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
};
exports.default = update;
//# sourceMappingURL=update.js.map