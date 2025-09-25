"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmin = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const mongoose_1 = require("mongoose");
const AdminRepo_1 = __importDefault(require("../../database/repository/AdminRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.updateAdmin = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const user = await AdminRepo_1.default.findByObj({
        _id: userId,
        status: true,
        deletedAt: null,
    });
    if (!user)
        throw new ApiError_1.BadRequestError("Admin not registered or deleted");
    if (user._id.toString() !== req.user._id.toString()) {
        if (req.user.roles[0].code === "ADMIN" /* RoleCode.ADMIN */) {
            throw new ApiError_1.BadRequestError("Admins can only update their own profile");
        }
    }
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.roles)
        user.roles = req.body.roles;
    if (req.body.email)
        user.email = req.body.email;
    if (req.body.phoneNumber)
        user.phoneNumber = req.body.phoneNumber;
    if (req.body.lastname)
        user.lastname = req.body.lastname;
    const profilePicUrl = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePicUrl)
        ? req.files.profilePicUrl[0].path
        : "";
    if (profilePicUrl)
        user.profilePicUrl = profilePicUrl;
    const { updatedAt, createdAt, status, roles, ...userToUpdate } = user;
    await AdminRepo_1.default.updateInfo(userToUpdate);
    return new ApiResponse_1.SuccessResponse("Profile updated", user).send(res);
});
//# sourceMappingURL=updateAdmin.controller.js.map