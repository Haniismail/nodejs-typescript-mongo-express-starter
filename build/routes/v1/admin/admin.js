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
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const authorization_1 = __importDefault(require("../../../auth/authorization"));
const admin_1 = __importDefault(require("../../../controllers/admin"));
const validator_1 = __importStar(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const uploadDestiny_1 = __importDefault(require("../../../helpers/fileUpload/uploadDestiny"));
const index_1 = __importDefault(require("../../../helpers/fileUpload/index"));
const global_routes_schema_1 = require("../global.routes.schema");
const router = express_1.default.Router();
const fileUploadHandler = new index_1.default();
router.use('/', authentication_1.default, (0, authorization_1.default)(["ADMIN" /* RoleCode.ADMIN */, "SUPERADMIN" /* RoleCode.SUPERADMIN */]));
router.get('/all', admin_1.default.getAllAdmins);
router.get('/all/non-admins', admin_1.default.getAllNonAdmins);
router.get('/me', admin_1.default.getMyProfile);
router.get('/:id', (0, validator_1.default)(schema_1.default.userId, validator_1.ValidationSource.PARAM), admin_1.default.getAdmin);
router.put('/:id', (0, uploadDestiny_1.default)('admins'), fileUploadHandler.handleSingleFileUpload('profilePicUrl'), (0, validator_1.default)(global_routes_schema_1.mediaFodlerNameSchemaAndObjectId, validator_1.ValidationSource.PARAM), (0, validator_1.default)(schema_1.default.update), admin_1.default.updateAdmin);
router.post('/', (0, uploadDestiny_1.default)('admins'), fileUploadHandler.handleSingleFileUpload('profilePicUrl'), (0, validator_1.default)(schema_1.default.create), admin_1.default.createAdmin);
router.delete('/:id', (0, authorization_1.default)(["SUPERADMIN" /* RoleCode.SUPERADMIN */]), (0, validator_1.default)(schema_1.default.userId, validator_1.ValidationSource.PARAM), admin_1.default.deleteAdmin);
exports.default = router;
//# sourceMappingURL=admin.js.map