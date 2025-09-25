"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const lodash_1 = __importDefault(require("lodash"));
const uuid_1 = require("uuid");
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const emails_1 = require("../../../helpers/emails");
const AdminRepo_1 = __importDefault(require("../../../database/repository/AdminRepo"));
exports.signup = (0, asyncHandler_1.default)(async (req, res) => {
    var _a, _b;
    const { name, email } = req.body;
    let profilePicUrl = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.profilePicUrl)
        ? (_b = req.files) === null || _b === void 0 ? void 0 : _b.profilePicUrl[0].path
        : "";
    let user = await AdminRepo_1.default.findByEmail(email);
    if (user)
        throw new ApiError_1.BadRequestError("User already registered");
    const generateSimplePassword = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };
    const password = generateSimplePassword(8); // Adjust the length as needed
    const confirmationToken = (0, uuid_1.v4)();
    const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
    const createdUser = await AdminRepo_1.default.create({ name, email, password, profilePicUrl, token: confirmationToken }, "ADMIN" /* RoleCode.ADMIN */);
    (0, emails_1.sendEmail)({
        email: createdUser.email,
        subject: "Confirm Your Account",
        message: "",
        template: "emailConfirmationLink",
        variables: {
            name: createdUser.name,
            password: password,
            confirmationLink,
        },
    });
    new ApiResponse_1.SuccessResponse("The confirmation e-mail has been set, check your inbox or your spam folder !", {
        user: lodash_1.default.pick(createdUser, [
            "_id",
            "name",
            "email",
            "roles",
            "profilePicUrl",
            "verified",
        ]),
    }).send(res);
});
//# sourceMappingURL=signup.controller.js.map