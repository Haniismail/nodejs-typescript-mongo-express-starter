"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.createUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { body } = req;
    const user = await UserRepo_1.default.create(body);
    new ApiResponse_1.SuccessResponse('User has been created successfully!', user).send(res);
});
//# sourceMappingURL=create.controller.js.map