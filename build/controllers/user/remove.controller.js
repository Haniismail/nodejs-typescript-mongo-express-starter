"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
exports.removeUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await UserRepo_1.default.remove(id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not found');
    return new ApiResponse_1.SuccessMsgResponse('User Deleted').send(res);
});
//# sourceMappingURL=remove.controller.js.map