import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { envConfig } from "../config/config"
const { serviceCloudinary } = envConfig;
cloudinary.config({
  cloud_name: serviceCloudinary.cloudName,
  api_key: serviceCloudinary.apiKey,
  api_secret: serviceCloudinary.apiSecret
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "test-folder"
  })
})



export { cloudinary, storage }
