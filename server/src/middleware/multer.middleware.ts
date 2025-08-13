import { Request } from "express";
import multer from "multer";



// Local Method To File Handling in Local System
const storage = multer.diskStorage({
  // Step 1: Incoming Data's Location Declaration 
  // cb (error,success) --> callback function
  destination: function(req: Request, file: Express.Multer.File, cb: any
  ) {
    cb(null, './src/storage')
  },

  // Step 2: File Renaming of Received Data 
  filename: function(req: Request, file: Express.Multer.File, cb: any
  ) {
    cb(null, `${Date.now()}-${file.originalname}`)
    // Unique fileName ---> 1751350194365-fileName.pdf
    // To avoid same fileName file collision we put unique rename        
  }

})

// hello.pdf ---> multer ---> location (storage) ---> hello-2025-07-01

export { storage, multer }
