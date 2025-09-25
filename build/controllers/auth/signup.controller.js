"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const uuid_1 = require("uuid");
const ApiResponse_1 = require("../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../database/repository/UserRepo"));
const ApiError_1 = require("../../core/ApiError");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const emails_1 = require("../../helpers/emails");
const RoleRepo_1 = __importDefault(require("../../database/repository/RoleRepo"));
exports.signup = (0, asyncHandler_1.default)(async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password, userName, userType, } = req.body;
    let user = await UserRepo_1.default.getOneByObj({ email });
    if (user)
        throw new ApiError_1.BadRequestError('User already registered');
    const roleUser = await RoleRepo_1.default.findByCode("USER" /* RoleCode.USER */);
    if (!roleUser)
        throw new ApiError_1.BadRequestError('role not found');
    const confirmationToken = (0, uuid_1.v4)();
    const confirmationLink = `${process.env.CLIENT_BASE_URL}/email/confirm/${confirmationToken}`;
    const createdUser = await UserRepo_1.default.create({
        firstName,
        lastName,
        email,
        userType,
        phoneNumber,
        password,
        token: confirmationToken,
        verified: false,
        userName,
        roles: [roleUser._id],
    });
    (0, emails_1.sendEmail)({
        email: createdUser.email,
        subject: 'confirme ton email',
        message: '',
        template: 'emailConfirmationLink',
        variables: {
            name: createdUser.firstName,
            confirmationLink,
        },
    });
    new ApiResponse_1.SuccessResponse('La confirmation par e-mail a été envoyée', user).send(res);
});
//# sourceMappingURL=signup.controller.js.map