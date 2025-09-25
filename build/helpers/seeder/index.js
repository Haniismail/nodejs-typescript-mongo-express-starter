"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const roles_1 = require("./roles");
const superAdmin_1 = require("./superAdmin");
const admin_1 = require("./admin");
const envVar_1 = require("../../config/envVar");
const envVar_2 = require("../../config/envVar");
const drop_1 = require("./drop");
require("../../database");
let seed = async (args = { clearDatabase: false }) => {
    if (args.clearDatabase)
        await (0, drop_1.seedDelete)();
    await (0, roles_1.seedRoles)(["SUPERADMIN" /* RoleCode.SUPERADMIN */, "ADMIN" /* RoleCode.ADMIN */, "USER" /* RoleCode.USER */]);
    await (0, superAdmin_1.seedSuperAdmin)("SUPERADMIN" /* RoleCode.SUPERADMIN */, envVar_1.seeder.superAdminEmail, envVar_1.seeder.superAdminName, envVar_1.seeder.superAdminPass);
    await (0, admin_1.seedAdmin)("ADMIN" /* RoleCode.ADMIN */, envVar_1.seeder.AdminEmail, envVar_1.seeder.AdminName, envVar_1.seeder.AdminPass);
    envVar_2.environment !== 'test' && process.exit(1);
};
exports.seed = seed;
(0, exports.seed)({ clearDatabase: envVar_2.environment === 'test' });
//# sourceMappingURL=index.js.map