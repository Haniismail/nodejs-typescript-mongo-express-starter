"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getMyProfile = void 0;
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
exports.getMyProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.getOneById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    return new ApiResponse_1.SuccessResponse('success', user).send(res);
});
exports.updateProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.getOneById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not registered');
    if (req.file)
        user.profilePicUrl = req.file.path;
    await UserRepo_1.default.update(user._id, { ...user });
    return new ApiResponse_1.SuccessResponse('Profile updated', user).send(res);
});
//# sourceMappingURL=profileController.js.map