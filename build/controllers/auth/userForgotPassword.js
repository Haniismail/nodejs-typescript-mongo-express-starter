"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userForgotPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const emails_1 = require("../../helpers/emails");
exports.userForgotPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const { email } = req.body;
    let user = await UserRepo_1.default.getOneByObj({ email });
    if (!user)
        throw new ApiError_1.BadRequestError('Invalid email');
    const resetCode = crypto_1.default.randomInt(111111, 999999).toString();
    user.resetCode = resetCode;
    await UserRepo_1.default.update(user._id, { resetCode });
    (0, emails_1.sendEmail)({
        email: user.email,
        subject: 'forget Password',
        message: '',
        template: 'emailConfirmationCode',
        variables: {
            code: resetCode,
        },
    });
    return new ApiResponse_1.SuccessMsgResponse('an email have been sent').send(res);
});
//# sourceMappingURL=userForgotPassword.js.map