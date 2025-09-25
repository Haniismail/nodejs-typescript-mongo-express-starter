"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./core/Logger"));
const envVar_1 = require("./config/envVar");
const app_1 = __importDefault(require("./app"));
app_1.default
    .listen(envVar_1.port, () => {
    Logger_1.default.info(`server running on port : ${envVar_1.port} ✅`);
})
    .on('error', (e) => {
    Logger_1.default.error(e);
});
//# sourceMappingURL=server.js.map