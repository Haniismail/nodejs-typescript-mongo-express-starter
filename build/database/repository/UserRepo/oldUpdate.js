"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../model/User");
const KeystoreRepo_1 = __importDefault(require("../KeystoreRepo"));
const update = async (user, accessTokenKey, refreshTokenKey) => {
    await User_1.UserModel.updateOne({ _id: user._id }, { $set: { ...user } }).exec();
    const keystore = await KeystoreRepo_1.default.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
};
exports.default = update;
//# sourceMappingURL=oldUpdate.js.map