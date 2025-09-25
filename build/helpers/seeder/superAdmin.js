"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const Role_1 = require("../../database/model/Role");
const emojis_1 = require("../../constants/emojis");
const Admin_1 = require("../../database/model/Admin");
const seedSuperAdmin = async (roleCode, email, name, password) => {
    let roleSuperAdmin = await Role_1.RoleModel.findOne({ code: roleCode });
    if (roleSuperAdmin) {
        let superAdmin = await Admin_1.AdminModel.find({
            roles: roleSuperAdmin._id,
            deletedAt: null,
        }).countDocuments();
        if (superAdmin > 0) {
            console.log(`${roleCode} user exist`);
        }
        else {
            try {
                let superAdmin = {
                    roles: [roleSuperAdmin],
                    verified: true,
                    name,
                    email,
                    password,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await Admin_1.AdminModel.create(superAdmin);
                console.log(`a new ${roleCode} has been created successfully ` + emojis_1.EMOJIS.SUCCESS);
            }
            catch (error) {
                console.log('error : ', error);
            }
        }
    }
    else {
        console.log('Role user inexistant !');
    }
};
exports.seedSuperAdmin = seedSuperAdmin;
//# sourceMappingURL=superAdmin.js.map