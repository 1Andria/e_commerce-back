"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({}),
    limits: {
        fileSize: 3 * 1024 * 1024,
    },
};
//# sourceMappingURL=multer-config.js.map