"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("./create"));
const getAll_1 = __importDefault(require("./getAll"));
const getOneById_1 = __importDefault(require("./getOneById"));
const getOneByObj_1 = __importDefault(require("./getOneByObj"));
const update_1 = __importDefault(require("./update"));
const remove_1 = __importDefault(require("./remove"));
const oldUpdate_1 = __importDefault(require("./oldUpdate"));
exports.default = {
    create: create_1.default,
    getAll: getAll_1.default,
    getOneById: getOneById_1.default,
    getOneByObj: getOneByObj_1.default,
    update: update_1.default,
    remove: remove_1.default,
    oldUpdate: oldUpdate_1.default,
};
//# sourceMappingURL=index.js.map