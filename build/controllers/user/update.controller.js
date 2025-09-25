"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.updateUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    if (req.file)
        body.profilePicUrl = req.file.path;
    const user = await UserRepo_1.default.update(id, body);
    if (!user)
        throw new ApiError_1.BadRequestError('user not found');
    return new ApiResponse_1.SuccessResponse('User updated', user).send(res);
});
//# sourceMappingURL=update.controller.js.map