"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = require("../../model/Admin");
const apiFeatures_1 = __importDefault(require("../../../helpers/apiFeatures"));
const findAll = async (paging, query, apiOptions) => {
    let findAllQuery = apiOptions.deleted
        ? Admin_1.AdminModel.find({ deletedAt: { $ne: null } })
        : Admin_1.AdminModel.find({ deletedAt: null });
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
exports.default = findAll;
//# sourceMappingURL=findAll.js.map