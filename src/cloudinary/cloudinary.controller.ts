import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload Image on cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload-image')
  @UseInterceptors(FilesInterceptor('file'))
  uploadImage(@UploadedFiles() file: Express.Multer.File) {
    
    return this.cloudinaryService.uploadImage(file);
  }
}
