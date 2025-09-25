"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.getUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = await UserRepo_1.default.getOneById(id);
    if (!user)
        throw new ApiError_1.BadRequestError('User not found');
    return new ApiResponse_1.SuccessResponse('success', user).send(res);
});
//# sourceMappingURL=getOne.controller.js.map