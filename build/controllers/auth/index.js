"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_controller_1 = require("./login.controller");
const signup_controller_1 = require("./signup.controller");
const refreshToken_controller_1 = require("./refreshToken.controller");
const logout_controller_1 = require("./logout.controller");
const confirmEmail_controller_1 = require("./confirmEmail.controller");
const userForgotPassword_1 = require("./userForgotPassword");
const userResetPassword_1 = require("./userResetPassword");
exports.default = {
    confirmEmail: confirmEmail_controller_1.confirmEmail,
    login: login_controller_1.login,
    signup: signup_controller_1.signup,
    refreshToken: refreshToken_controller_1.refreshToken,
    logout: logout_controller_1.logout,
    userForgotPassword: userForgotPassword_1.userForgotPassword,
    userResetPassword: userResetPassword_1.userResetPassword,
};
//# sourceMappingURL=index.js.map