"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoles = void 0;
const Role_1 = require("../../database/model/Role");
const emojis_1 = require("../../constants/emojis");
const createRole = (code) => ({
    code,
    createdAt: new Date(),
    updatedAt: new Date(),
});
const seedRoles = async (roles) => {
    try {
        let notCreatedRole = [];
        for (const role of roles) {
            const roleFound = await Role_1.RoleModel.findOne({ code: role });
            if (!roleFound) {
                await Role_1.RoleModel.create(createRole(role));
                console.info(`\n${emojis_1.EMOJIS.SUCCESS}\tRole ${role} created! \n`);
            }
            else {
                notCreatedRole.push(role);
            }
        }
        if (notCreatedRole.length > 0) {
            console.info(`\n${emojis_1.EMOJIS.SUCCESS}\tRoles ${notCreatedRole.join(', ')} already exist! \n`);
        }
    }
    catch (err) {
        console.error('Error seeding roles:', err);
    }
};
exports.seedRoles = seedRoles;
//# sourceMappingURL=roles.js.map