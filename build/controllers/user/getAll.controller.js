"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiResponse_1 = require("../../core/ApiResponse");
exports.getAllUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const { page, perPage, deleted } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 12) || 12,
    };
    const users = await UserRepo_1.default.getAll(options, req.query, {
        isPaging: true,
        deleted: deleted == 'true' ? true : false,
    });
    const { docs, ...meta } = users;
    new ApiResponse_1.SuccessResponsePaginate('All users returned successfuly', docs, meta).send(res);
});
//# sourceMappingURL=getAll.controller.js.map