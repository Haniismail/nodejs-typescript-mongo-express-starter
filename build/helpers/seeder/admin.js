"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const Role_1 = require("../../database/model/Role");
const emojis_1 = require("../../constants/emojis");
const Admin_1 = require("../../database/model/Admin");
const seedAdmin = async (roleCode, email, name, password) => {
    let roleAdmin = await Role_1.RoleModel.findOne({ code: roleCode });
    if (roleAdmin) {
        let admin = await Admin_1.AdminModel.find({
            roles: roleAdmin._id,
            deletedAt: null,
        }).countDocuments();
        if (admin > 0) {
            console.log(`${roleCode} user exist`);
        }
        else {
            try {
                let admin = {
                    roles: [roleAdmin],
                    verified: true,
                    name,
                    email,
                    password,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                await Admin_1.AdminModel.create(admin);
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
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=admin.js.map