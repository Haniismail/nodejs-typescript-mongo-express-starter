"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importStar(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const auth_1 = __importDefault(require("../../../controllers/auth"));
const global_routes_schema_1 = require("../global.routes.schema");
const fileUpload_1 = __importDefault(require("../../../helpers/fileUpload"));
const auth_2 = __importDefault(require("../../../controllers/admin/auth"));
const auth_3 = __importDefault(require("../../../controllers/auth"));
const uploadDestiny_1 = __importDefault(require("../../../helpers/fileUpload/uploadDestiny"));
const router = express_1.default.Router();
const fileUploadHandler = new fileUpload_1.default();
router.post('/signup', (0, validator_1.default)(schema_1.default.signup), auth_3.default.signup);
router.post('/login', (0, validator_1.default)(schema_1.default.userLogin), auth_3.default.login);
router.post('/signup', (0, validator_1.default)(schema_1.default.signup), auth_1.default.signup);
router.post('/login', (0, validator_1.default)(schema_1.default.userLogin), auth_1.default.login);
router.get('/confirm/:token', (0, validator_1.default)(global_routes_schema_1.tokenSchema, validator_1.ValidationSource.PARAM), auth_3.default.confirmEmail);
router.post('/forget-password', (0, validator_1.default)(schema_1.default.forgetPassword), auth_3.default.userForgotPassword);
router.post('/reset-password', (0, validator_1.default)(schema_1.default.resetPassword), auth_3.default.userResetPassword);
router.post('/admins/login', (0, validator_1.default)(schema_1.default.adminLogin), auth_2.default.login);
router.post('/admins/forgot-password', (0, validator_1.default)(schema_1.default.forgotPassword), auth_2.default.adminForgotPassword);
router.post('/admins', (0, uploadDestiny_1.default)('admins'), fileUploadHandler.handleSingleFileUpload('profilePicUrl'), (0, validator_1.default)(schema_1.default.adminSignup), auth_2.default.signup);
router.get('/admins/confirm/:token', (0, validator_1.default)(global_routes_schema_1.tokenSchema, validator_1.ValidationSource.PARAM), auth_2.default.confirmEmail);
router.post('/admins/reset-password/:token', (0, validator_1.default)(global_routes_schema_1.tokenSchema, validator_1.ValidationSource.PARAM), (0, validator_1.default)(schema_1.default.AdminresetPassword), auth_2.default.adminResetPassword);
router.use('/', authentication_1.default);
router.post('/refresh', (0, validator_1.default)(schema_1.default.auth, validator_1.ValidationSource.HEADER), (0, validator_1.default)(schema_1.default.refreshToken), auth_3.default.refreshToken);
router.delete('/logout', auth_3.default.logout);
router.post('/admins/refresh', (0, validator_1.default)(schema_1.default.auth, validator_1.ValidationSource.HEADER), (0, validator_1.default)(schema_1.default.refreshToken), auth_2.default.refreshToken);
router.delete('/admins/logout', auth_2.default.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map