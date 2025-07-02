"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfig = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        return cloudinary_1.v2;
    },
};
//# sourceMappingURL=cloudinary.config.js.map