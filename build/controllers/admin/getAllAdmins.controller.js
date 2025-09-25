"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAdmins = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiResponse_1 = require("../../core/ApiResponse");
const AdminRepo_1 = __importDefault(require("../../database/repository/AdminRepo"));
exports.getAllAdmins = (0, asyncHandler_1.default)(async (req, res) => {
    const { page, perPage, deleted } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 12) || 12,
    };
    const users = await AdminRepo_1.default.findAll(options, req.query, {
        isPaging: true,
        deleted: deleted == "true" ? true : false,
    });
    const { docs, ...meta } = users;
    const filteredDocs = users.docs.filter((el) => el.token);
    new ApiResponse_1.SuccessResponsePaginate("All admins returned successfuly", filteredDocs, meta).send(res);
});
//# sourceMappingURL=getAllAdmins.controller.js.map