"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const mongoose_1 = require("mongoose");
const KeystoreRepo_1 = __importDefault(require("../../database/repository/KeystoreRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
const AdminRepo_1 = __importDefault(require("../../database/repository/AdminRepo"));
exports.deleteAdmin = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const user = await AdminRepo_1.default.findByObj({
        _id: userId,
        status: true,
        deletedAt: null,
    });
    if (!user)
        throw new ApiError_1.BadRequestError("Admin not registered or deleted");
    if ((user === null || user === void 0 ? void 0 : user._id.toString()) === req.user._id.toString())
        throw new ApiError_1.BadRequestError("You cannot delete yourself");
    await KeystoreRepo_1.default.remove(user._id);
    let deletedUser = await AdminRepo_1.default.deleteUser(user);
    return new ApiResponse_1.SuccessResponse("Admin Deleted", deletedUser).send(res);
});
//# sourceMappingURL=deleteAdmin.controller.js.map