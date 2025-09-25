"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaFodlerNameSchemaAndObjectId = exports.ObjectIdSchema = exports.tokenSchema = exports.mediaFodlerNameSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../helpers/validator");
exports.mediaFodlerNameSchema = joi_1.default.object({
    mediaFolderName: joi_1.default.string().required().min(3),
});
exports.tokenSchema = joi_1.default.object({
    token: joi_1.default.string().required().min(36).max(36),
});
exports.ObjectIdSchema = joi_1.default.object({
    id: (0, validator_1.JoiObjectId)().required(),
});
exports.mediaFodlerNameSchemaAndObjectId = joi_1.default.object({
    mediaFolderName: joi_1.default.string().required().min(3),
    id: (0, validator_1.JoiObjectId)().required(),
});
//# sourceMappingURL=global.routes.schema.js.map