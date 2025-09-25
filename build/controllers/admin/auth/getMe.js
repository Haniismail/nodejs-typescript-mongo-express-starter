"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProfile = void 0;
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
exports.getMyProfile = (0, asyncHandler_1.default)(async (req, res) => {
    const admin = await AdminRepo_1.default.findById(req.user._id);
    if (!admin)
        throw new ApiError_1.BadRequestError('admin not registered');
    return new ApiResponse_1.SuccessResponse('success', admin).send(res);
});
//# sourceMappingURL=getMe.js.map