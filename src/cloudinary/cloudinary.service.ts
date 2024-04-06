import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require("buffer-to-stream");
@Injectable()

export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<{
    message: string;
    image_url: string;
}> {
  if (!file[0].mimetype.startsWith('image/')) {
    throw new BadRequestException('Uploaded file is not an image.');
  }
    const uploadedImage =  new Promise<string>((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder: 'learnUploadImageApi' },(error, result) => {
        if (error) return reject(error);
        resolve(result.url);
      });

      toStream(file[0].buffer).pipe(upload);
    });
    
    return { 
      message: "image uploaded successfully",
      image_url: await uploadedImage,
    }
  }
}