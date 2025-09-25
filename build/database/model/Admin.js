"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.DOCUMENT_NAME = "Admin";
exports.COLLECTION_NAME = "admins";
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
    },
    lastname: {
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
        select: false,
    },
    profilePicUrl: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
        select: false,
    },
    verified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    token: {
        type: mongoose_1.Schema.Types.String,
        nullable: true,
    },
    deletedAt: {
        type: Date,
        select: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
schema.pre("save", async function (next) {
    var _a;
    if (this.isModified("email"))
        this.email = (_a = this.email) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 12);
    next();
});
// on delete, remove it from config model
// schema.pre("deleteOne", async function () {
//   const user = this as Admin | any;
//   const userId = user._conditions._id;
//   await model("Video").updateMany({ user: userId }, { $unset: { user: 1 } });
//   await model("Project").updateMany({ user: userId }, { $unset: { user: 1 } });
// });
schema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.AdminModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=Admin.js.map