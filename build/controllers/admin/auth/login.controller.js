"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
const ApiError_1 = require("../../../core/ApiError");
const KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
const authUtils_1 = require("../../../auth/authUtils");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const auth_1 = require("../../../helpers/auth");
exports.login = (0, asyncHandler_1.default)(async (req, res) => {
    let admin = await AdminRepo_1.default.findByEmail(req.body.email);
    if (!admin)
        throw new ApiError_1.BadRequestError('Admin not registered');
    if (!admin.password)
        throw new ApiError_1.BadRequestError('Credential not set');
    if (!admin.verified)
        throw new ApiError_1.BadRequestError('Admin not verified');
    const match = await bcryptjs_1.default.compare(req.body.password, admin.password);
    if (!match)
        throw new ApiError_1.AuthFailureError('Authentication failure');
    const { accessTokenKey, refreshTokenKey } = (0, auth_1.generateKeys)();
    await KeystoreRepo_1.default.create(admin._id, accessTokenKey, refreshTokenKey);
    const [tokens, filteredadmin] = await Promise.all([
        (0, authUtils_1.createTokens)(admin, accessTokenKey, refreshTokenKey, true),
        lodash_1.default.pick(admin, ['_id', 'name', 'email', 'roles', 'profilePicUrl', 'verified', 'createdAt']),
    ]);
    new ApiResponse_1.SuccessResponse('Login Success', {
        user: filteredadmin,
        tokens: tokens,
    }).send(res);
});
//# sourceMappingURL=login.controller.js.map