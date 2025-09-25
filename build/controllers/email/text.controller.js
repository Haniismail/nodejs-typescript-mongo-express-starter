"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHtmlEmail = exports.sendTextEmail = void 0;
const ApiResponse_1 = require("../../core/ApiResponse");
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const emails_1 = require("../../helpers/emails");
exports.sendTextEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const { to, subject, text } = req.body;
    (0, emails_1.sendEmail)({
        email: to,
        subject,
        message: text,
    });
    new ApiResponse_1.SuccessMsgResponse('Email has been sent Successfully!').send(res);
});
exports.sendHtmlEmail = (0, asyncHandler_1.default)(async (req, res) => {
    const { to, subject, template } = req.body;
    (0, emails_1.sendEmail)({
        email: to,
        subject,
        message: '',
        template,
    });
    new ApiResponse_1.SuccessMsgResponse('Email has been sent Successfully!').send(res);
});
//# sourceMappingURL=text.controller.js.map