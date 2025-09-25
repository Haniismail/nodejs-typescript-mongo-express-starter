"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = void 0;
const lodash_1 = __importDefault(require("lodash"));
const crypto_1 = __importDefault(require("crypto"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const authUtils_1 = require("../../../auth/authUtils");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const emails_1 = require("../../../helpers/emails");
const KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
exports.confirmEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const token = req.params.token;
    const user = await AdminRepo_1.default.findByObj({ token });
    if (!user)
        throw new ApiError_1.BadRequestError('Invalid confirmation token');
    user.token = null;
    user.verified = true;
    user.status = true;
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const keystore = await KeystoreRepo_1.default.create(user._id, accessTokenKey, refreshTokenKey);
    await AdminRepo_1.default.update(user, keystore === null || keystore === void 0 ? void 0 : keystore.primaryKey, keystore === null || keystore === void 0 ? void 0 : keystore.secondaryKey);
    const tokens = await (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey);
    req.user = user;
    (0, emails_1.sendEmail)({
        email: user.email,
        subject: 'Confirmation of Email Address',
        message: `Your email address has been confirmed and your account is now active.`,
        template: 'accountVerified',
    });
    new ApiResponse_1.SuccessResponse('Email confirmed successfully', {
        user: lodash_1.default.pick(user, [
            '_id',
            'name',
            'email',
            'roles',
            'profilePicUrl',
            'verified',
        ]),
        tokens,
    }).send(res);
});
//# sourceMappingURL=confirmEmail.controller.js.map