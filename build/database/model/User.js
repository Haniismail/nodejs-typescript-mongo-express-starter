"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const databaseHooks_1 = require("../../helpers/databaseHooks");
exports.DOCUMENT_NAME = 'User';
exports.COLLECTION_NAME = 'users';
const schema = new mongoose_1.Schema({
    firstName: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    userName: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        nullable: true,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
    },
    verified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    documentVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    token: {
        type: mongoose_1.Schema.Types.String,
        nullable: true,
    },
    resetCode: {
        type: mongoose_1.Schema.Types.String,
        nullable: true,
    },
    deletedAt: {
        type: Date,
        default: null,
        select: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
(0, databaseHooks_1.preFindHook)(schema);
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
schema.pre('save', async function (next) {
    var _a;
    if (this.isModified('email'))
        this.email = (_a = this.email) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    if (!this.isModified('password'))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
schema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=User.js.map