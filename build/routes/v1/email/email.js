"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const authorization_1 = __importDefault(require("../../../auth/authorization"));
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = require("./schema");
const text_controller_1 = require("../../../controllers/email/text.controller");
const router = express_1.default.Router();
router.use('/', authentication_1.default, (0, authorization_1.default)(["ADMIN" /* RoleCode.ADMIN */]));
router.post('/text', (0, validator_1.default)(schema_1.emailTextSchema), text_controller_1.sendTextEmail);
router.post('/html', (0, validator_1.default)(schema_1.emailHtmlSchema), text_controller_1.sendHtmlEmail);
exports.default = router;
//# sourceMappingURL=email.js.map