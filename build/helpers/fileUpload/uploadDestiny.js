"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadMediaFilesToThisFolder = (fodlerName) => (req, res, next) => {
    req.params.mediaFolderName = fodlerName;
    next();
};
exports.default = uploadMediaFilesToThisFolder;
//# sourceMappingURL=uploadDestiny.js.map