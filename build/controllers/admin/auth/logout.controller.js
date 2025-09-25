"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const ApiResponse_1 = require("../../../core/ApiResponse");
const KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
exports.logout = (0, asyncHandler_1.default)(async (req, res) => {
    await KeystoreRepo_1.default.remove(req.keystore._id);
    new ApiResponse_1.SuccessMsgResponse('Logout success').send(res);
});
//# sourceMappingURL=logout.controller.js.map