"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResetPassword = void 0;
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
exports.userResetPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const { resetCode, password } = req.body;
    let user = await UserRepo_1.default.getOneByObj({ resetCode });
    if (!user)
        throw new ApiError_1.BadRequestError('Invalid code');
    user.password = password;
    user.resetCode = null;
    await user.save();
    return new ApiResponse_1.SuccessMsgResponse('your password have been modified').send(res);
});
//# sourceMappingURL=userResetPassword.js.map