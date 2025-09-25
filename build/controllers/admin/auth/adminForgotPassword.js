"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminForgotPassword = void 0;
const uuid_1 = require("uuid");
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const emails_1 = require("../../../helpers/emails");
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
exports.adminForgotPassword = (0, asyncHandler_1.default)(async (req, res) => {
    const email = req.body.email;
    const user = await AdminRepo_1.default.findByEmail(email);
    if (!user)
        throw new ApiError_1.BadRequestError("Invalid email");
    const confirmationToken = (0, uuid_1.v4)();
    user.token = confirmationToken;
    await user.save();
    const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
    (0, emails_1.sendEmail)({
        email: email,
        subject: "Forgot your password ? ",
        message: "",
        template: "forgotPassword",
        variables: {
            name: user.name,
            confirmationLink,
        },
    });
    new ApiResponse_1.SuccessResponse("An email has been sent to recover your password", {}).send(res);
});
//# sourceMappingURL=adminForgotPassword.js.map