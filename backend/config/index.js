import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Extract Cloudinary configuration from the URL
function extractCloudinaryConfig() {
    const cloudinaryUrl = process.env.CLOUDINARY_URL || "cloudinary://643326862345851:TQ0X5mRe9ut8rgNTByM2jmhhIYA@ddk9qhmit";
    const regex = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/;
    const match = cloudinaryUrl.match(regex);
    if (!match) {
        throw new Error('Invalid Cloudinary URL format');
    }
    const [, apiKey, apiSecret, cloudName] = match;
    return {
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    };
}

export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASS,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_HOST: process.env.EMAIL_HOST,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION,


    NODE_ENV: process.env.NODE_ENV || "development",

    // CLOUDINARY_CONFIG: extractCloudinaryConfig(),

    // Google OAuth Configuration
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
};