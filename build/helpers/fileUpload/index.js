"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importStar(require("multer"));
const file_utils_1 = require("./file.utils");
const ApiResponse_1 = require("../../core/ApiResponse");
class FileUploadHandler {
    constructor() {
        this.handleFileUpload = (req, res, next) => {
            this.upload.single('file')(req, res, function (err) {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                // File has been uploaded successfully
                return res.json({ message: 'File uploaded successfully' });
            });
        };
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                (0, file_utils_1.createFolder)('./public');
                (0, file_utils_1.createFolder)('./public/uploads');
                const generatedFolder = (0, file_utils_1.getFileType)('', file.mimetype);
                const dynamicFolder = req.params.mediaFolderName;
                if (dynamicFolder) {
                    (0, file_utils_1.createFolder)(`./public/uploads/${dynamicFolder}`);
                    cb(null, `./public/uploads/${dynamicFolder}/`);
                }
                else {
                    (0, file_utils_1.createFolder)(`./public/uploads/${generatedFolder}`);
                    cb(null, `./public/uploads/${generatedFolder}/`);
                }
            },
            filename: function (req, file, cb) {
                // rename the file with the field name and the current date
                const generatedFolder = (0, file_utils_1.getFileType)('', file.mimetype);
                const dynamicFolder = req.params.mediaFolderName;
                if (dynamicFolder) {
                    cb(null, `${dynamicFolder}-${Date.now()}.${file.originalname
                        .split('.')
                        .pop()}`);
                }
                else {
                    cb(null, `${generatedFolder}-${Date.now()}.${file.originalname
                        .split('.')
                        .pop()}`);
                }
            },
        });
        const fileFilter = (req, file, cb) => {
            const allowedMimeTypes = [
                'image/jpeg',
                'image/jpg',
                'image/pjpeg',
                'image/svg+xml',
                'image/png',
                'image/webp',
                'image/gif',
                'image/jpg',
                'video/mp4',
                'video/avi',
                'video/mpeg',
                'video/ogg',
                'video/webm',
                'video/mov',
                'audio/mpeg',
                'audio/mp3',
                'audio/wav',
                'audio/ogg',
                'application/pdf',
            ];
            if (allowedMimeTypes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error('Invalid file type'));
            }
        };
        this.upload = (0, multer_1.default)({ storage, fileFilter });
    }
    handleSingleFileUpload(fieldName) {
        return (req, res, next) => {
            this.upload.single(fieldName)(req, res, (err) => {
                if (err instanceof multer_1.MulterError) {
                    return next(new ApiResponse_1.BadRequestResponse(err.message));
                }
                if (err) {
                    return next(new ApiResponse_1.BadRequestResponse(err.message));
                }
                next();
            });
        };
    }
    handleMultipleFileUpload() {
        return (req, res, next) => {
            this.upload.array('files')(req, res, (err) => {
                if (err instanceof multer_1.MulterError) {
                    return next(new ApiResponse_1.BadRequestResponse(err.message));
                }
                if (err) {
                    return next(new ApiResponse_1.BadRequestResponse(err.message));
                }
                next();
            });
        };
    }
}
exports.default = FileUploadHandler;
//# sourceMappingURL=index.js.map