"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const KeystoreRepo_1 = __importDefault(require("../../database/repository/KeystoreRepo"));
const authUtils_1 = require("../../auth/authUtils");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const auth_1 = require("../../helpers/auth");
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    let user = await UserRepo_1.default.getOneByObj({ email: req.body.email });
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    if (!user.password)
        throw new ApiError_1.BadRequestError('Credential not set');
    if (!user.verified)
        throw new ApiError_1.BadRequestError('User not verified');
    const match = await bcryptjs_1.default.compare(req.body.password, user.password);
    if (!match)
        throw new ApiError_1.AuthFailureError('Authentication failure');
    const { accessTokenKey, refreshTokenKey } = (0, auth_1.generateKeys)();
    await KeystoreRepo_1.default.create(user._id, accessTokenKey, refreshTokenKey);
    const [tokens, filteredUser] = await Promise.all([
        (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey),
        user,
    ]);
    new ApiResponse_1.SuccessResponse('Login Success', {
        user: filteredUser,
        tokens: tokens,
    }).send(res);
});
//# sourceMappingURL=login.controller.js.map