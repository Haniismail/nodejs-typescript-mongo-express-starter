"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
exports.default = {
    param: joi_1.default.object().keys({
        area: (0, validator_1.JoiObjectId)().optional(),
        population: (0, validator_1.JoiObjectId)().optional(),
        currencies: (0, validator_1.JoiObjectId)().optional(),
        languages: (0, validator_1.JoiObjectId)().optional(),
    }),
};
//# sourceMappingURL=schema.js.map