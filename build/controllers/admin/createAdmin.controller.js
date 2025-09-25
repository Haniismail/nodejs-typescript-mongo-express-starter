"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiError_1 = require("../../core/ApiError");
const lodash_1 = __importDefault(require("lodash"));
const AdminRepo_1 = __importDefault(require("../../database/repository/AdminRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.createAdmin = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const { name, email, password, verified, phoneNumber, lastname } = req.body;
    const profilePicUrl = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePicUrl)
        ? req.files.profilePicUrl[0].path
        : '';
    let user = await AdminRepo_1.default.findByEmail(email);
    if (user)
        throw new ApiError_1.BadRequestError('Admin already registered');
    const createdAdmin = await AdminRepo_1.default.create({ name, email, password, profilePicUrl, phoneNumber, lastname }, "ADMIN" /* RoleCode.ADMIN */, verified);
    new ApiResponse_1.SuccessResponse('Admin has been created successfully!', lodash_1.default.pick(createdAdmin, ['_id', 'name', 'email', 'roles', 'profilePicUrl', 'verified', 'lastname'])).send(res);
});
//# sourceMappingURL=createAdmin.controller.js.map