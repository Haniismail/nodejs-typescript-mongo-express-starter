"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
exports.default = {
    param: joi_1.default.object().keys({
        id: (0, validator_1.JoiObjectId)().required(),
    }),
    profile: joi_1.default.object().keys({
        name: joi_1.default.string().optional().min(1).max(200),
        lastname: joi_1.default.string().optional().min(1).max(200),
        profilePicUrl: joi_1.default.string().optional().uri(),
    }),
    create: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(1).max(200),
        lastname: joi_1.default.string().min(1).max(200).empty(''),
        email: joi_1.default.string().required().email(),
        phoneNumber: joi_1.default.string().optional().min(1).max(200).empty(''),
        userType: (0, validator_1.JoiObjectId)().required(),
        password: joi_1.default.string()
            .required()
            .regex(/^[a-zA-Z0-9]{8,30}$/),
        profilePicUrl: joi_1.default.string().optional().uri(),
        roles: joi_1.default.array().items(joi_1.default.string()).required(),
        verified: joi_1.default.boolean().required(),
    }),
    update: joi_1.default.object().keys({
        name: joi_1.default.string().min(1).max(200),
        lastname: joi_1.default.string().min(1).max(200),
        email: joi_1.default.string().email(),
        phoneNumber: joi_1.default.string().optional().min(1).max(200),
        password: joi_1.default.string().regex(/^[a-zA-Z0-9]{8,30}$/),
        profilePicUrl: joi_1.default.string().optional().uri(),
        roles: joi_1.default.array().items(joi_1.default.string()),
        verified: joi_1.default.boolean(),
    }),
};
//# sourceMappingURL=schema.js.map