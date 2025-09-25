"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const apiFeatures_1 = __importDefault(require("../../../helpers/apiFeatures"));
const Role_1 = require("../../model/Role");
//To be fixed when merged
const getAllNonAdmins = async (paging, query, apiOptions) => {
    var _a;
    const userRoleId = (_a = (await Role_1.RoleModel.findOne({ code: 'USER' }).select('_id'))) === null || _a === void 0 ? void 0 : _a._id;
    let findAllQuery = apiOptions.deleted
        ? Admin_1.AdminModel.find({
            deletedAt: { $ne: null },
            roles: [userRoleId],
        })
        : Admin_1.AdminModel.find({
            deletedAt: null,
            roles: [userRoleId],
        });
    const features = new apiFeatures_1.default(findAllQuery, query)
        .filter()
        .sort()
        .limitFields()
        .search(['name', 'email']);
    const options = {
        query: features.query,
        limit: paging.limit ? paging.limit : null,
        page: paging.page ? paging.page : null,
    };
    return (await Admin_1.AdminModel.paginate(options));
};
exports.default = getAllNonAdmins;
//# sourceMappingURL=getAllNonAdmins.js.map