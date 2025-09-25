"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../core/ApiError");
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const arrays_1 = require("../helpers/utils/arrays");
exports.default = (roles) => (0, asyncHandler_1.default)(async (req, res, next) => {
    if (!req.user || !req.user.roles)
        throw new ApiError_1.AuthFailureError('Permission denied');
    const roleCodes = req.user.roles.map((role) => role.code);
    if ((0, arrays_1.hasCommonElement)(roles, roleCodes))
        return next();
    throw new ApiError_1.AuthFailureError('Permission denied');
});
//# sourceMappingURL=authorization.js.map