"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
const validator_2 = require("../../../helpers/validator");
exports.default = {
    userLogin: joi_1.default.object().keys({
        email: joi_1.default.string().email(),
        userName: joi_1.default.string().email(),
    }),
    adminLogin: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(6),
    }),
    refreshToken: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required().min(1),
    }),
    auth: joi_1.default.object()
        .keys({
        authorization: (0, validator_1.JoiAuthBearer)().required(),
    })
        .unknown(true),
    signup: joi_1.default.object().keys({
        firstName: joi_1.default.string().required().min(3),
        lastName: joi_1.default.string().required().min(3),
        userName: joi_1.default.string().required().min(3),
        email: joi_1.default.string().required().email().required(),
        phoneNumber: joi_1.default.string().required().min(8).required(),
        userType: (0, validator_2.JoiObjectId)().required(),
    }),
    adminSignup: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(3),
        email: joi_1.default.string().required().email(),
        phoneNumber: joi_1.default.string().optional().min(8),
        password: joi_1.default.string()
            .required()
            .regex(/^[a-zA-Z0-9]{8,30}$/)
            .required(),
    }),
    forgetPassword: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
    }),
    resetPassword: joi_1.default.object().keys({
        resetCode: joi_1.default.string().required().min(6).max(6),
        password: joi_1.default.string()
            .required()
            .regex(/^[a-zA-Z0-9]{8,30}$/),
        profilePicUrl: joi_1.default.string().optional().uri(),
    }),
    forgotPassword: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
    }),
    AdminresetPassword: joi_1.default.object().keys({
        newPassword: joi_1.default.string()
            .required()
            .regex(/^[a-zA-Z0-9]{8,30}$/),
    }),
};
//# sourceMappingURL=schema.js.map