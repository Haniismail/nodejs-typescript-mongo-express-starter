"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = require("mongoose");
const JWT_1 = __importDefault(require("../../../core/JWT"));
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
const ApiError_1 = require("../../../core/ApiError");
const KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
const authUtils_1 = require("../../../auth/authUtils");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const ApiResponse_1 = require("../../../core/ApiResponse");
exports.refreshToken = (0, asyncHandler_1.default)(async (req, res) => {
    req.accessToken = (0, authUtils_1.getAccessToken)(req.headers.authorization); // Express headers are auto converted to lowercase
    const accessTokenPayload = await JWT_1.default.decode(req.accessToken);
    (0, authUtils_1.validateTokenData)(accessTokenPayload);
    const user = await AdminRepo_1.default.findById(new mongoose_1.Types.ObjectId(accessTokenPayload.sub));
    if (!user)
        throw new ApiError_1.AuthFailureError('Admin not registered');
    req.user = user;
    const refreshTokenPayload = await JWT_1.default.validate(req.body.refreshToken);
    (0, authUtils_1.validateTokenData)(refreshTokenPayload);
    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        throw new ApiError_1.AuthFailureError('Invalid access token');
    const keystore = await KeystoreRepo_1.default.find(req.user._id, accessTokenPayload.prm, refreshTokenPayload.prm);
    if (!keystore)
        throw new ApiError_1.AuthFailureError('Invalid access token');
    await KeystoreRepo_1.default.remove(keystore._id);
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    await KeystoreRepo_1.default.create(req.user._id, accessTokenKey, refreshTokenKey);
    const tokens = await (0, authUtils_1.createTokens)(req.user, accessTokenKey, refreshTokenKey);
    new ApiResponse_1.TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
});
//# sourceMappingURL=refreshToken.controller.js.map