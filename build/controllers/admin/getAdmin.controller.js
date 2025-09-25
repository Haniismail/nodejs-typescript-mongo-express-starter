"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const mongoose_1 = require("mongoose");
const AdminRepo_1 = __importDefault(require("../../database/repository/AdminRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.getAdmin = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const user = await AdminRepo_1.default.findByObj({
        _id: userId,
        status: true,
        deletedAt: null,
    });
    if (req.user.roles[0].code !== "SUPERADMIN" /* RoleCode.SUPERADMIN */ &&
        ((_a = user === null || user === void 0 ? void 0 : user.roles[0]) === null || _a === void 0 ? void 0 : _a.code) === "SUPERADMIN" /* RoleCode.SUPERADMIN */)
        throw new ApiError_1.BadRequestError("Super Admin cant be fetched");
    if (!user)
        throw new ApiError_1.BadRequestError("Admin not registered or deleted");
    return new ApiResponse_1.SuccessResponse("success", user).send(res);
});
//# sourceMappingURL=getAdmin.controller.js.map