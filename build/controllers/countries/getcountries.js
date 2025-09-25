"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcountries = void 0;
const asyncHandler_1 = __importDefault(require("../../helpers/asyncHandler"));
const ApiResponse_1 = require("../../core/ApiResponse");
const fetchCountries_1 = __importDefault(require("../../helpers/fetchCountries"));
exports.getcountries = (0, asyncHandler_1.default)(async (req, res) => {
    (0, fetchCountries_1.default)();
    //throw error  if there is no response
    return new ApiResponse_1.SuccessResponse("success", {}).send(res);
});
//# sourceMappingURL=getcountries.js.map