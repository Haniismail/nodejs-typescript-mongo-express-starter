"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = require("./login.controller");
const signup_controller_1 = require("./signup.controller");
const refreshToken_controller_1 = require("./refreshToken.controller");
const logout_controller_1 = require("./logout.controller");
const confirmEmail_controller_1 = require("./confirmEmail.controller");
const adminForgotPassword_1 = require("./adminForgotPassword");
const adminResetPassword_1 = require("./adminResetPassword");
const getMe_1 = require("./getMe");
exports.default = {
    confirmEmail: confirmEmail_controller_1.confirmEmail,
    login: login_controller_1.login,
    signup: signup_controller_1.signup,
    refreshToken: refreshToken_controller_1.refreshToken,
    logout: logout_controller_1.logout,
    adminResetPassword: adminResetPassword_1.adminResetPassword,
    adminForgotPassword: adminForgotPassword_1.adminForgotPassword,
    getMyProfile: getMe_1.getMyProfile
};
//# sourceMappingURL=index.js.map