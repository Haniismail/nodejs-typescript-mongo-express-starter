"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtmlSchema = exports.emailTextSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.emailTextSchema = joi_1.default.object({
    to: joi_1.default.string().required().email(),
    subject: joi_1.default.string().required(),
    text: joi_1.default.string().required(),
});
exports.emailHtmlSchema = joi_1.default.object({
    to: joi_1.default.string().required().email(),
    subject: joi_1.default.string().required(),
    template: joi_1.default.string().required(),
});
//# sourceMappingURL=schema.js.map