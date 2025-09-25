"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllEnsAreNotEmpty = void 0;
require("dotenv/config");
const envVar_1 = require("../config/envVar");
const emojis_1 = require("../constants/emojis");
const checkAllEnsAreNotEmpty = () => {
    const envs = [
        envVar_1.environment,
        envVar_1.port,
        envVar_1.baseUrl,
        envVar_1.db.name,
        envVar_1.db.host,
        envVar_1.db.port,
        envVar_1.db.nameTest,
        envVar_1.apiPrefix,
        envVar_1.corsUrl,
        envVar_1.tokenInfo.accessTokenValidityDays,
        envVar_1.tokenInfo.refreshTokenValidityDays,
        envVar_1.tokenInfo.issuer,
        envVar_1.tokenInfo.audience,
        envVar_1.logDirectory,
        envVar_1.seeder.superAdminName,
        envVar_1.seeder.superAdminEmail,
        envVar_1.seeder.superAdminPass,
        envVar_1.email.smtpService,
        envVar_1.email.smtpHost,
        envVar_1.email.smtpPort,
        envVar_1.email.smtpUser,
        envVar_1.email.smtpPass,
    ];
    envs.forEach((env) => {
        if (!env) {
            console.error(`\n${emojis_1.EMOJIS.PROHIBITED}\tOne of the environment variables is not set! \n`);
            process.exit(0);
        }
    });
    console.info(`\n${emojis_1.EMOJIS.SUCCESS}\tAll environment variables are set! \n`);
};
exports.checkAllEnsAreNotEmpty = checkAllEnsAreNotEmpty;
(0, exports.checkAllEnsAreNotEmpty)();
//# sourceMappingURL=checks.js.map