import { Inject } from '@nestjs/common';
import { S3Service } from '../../vendor-services/aws/s3.service';
import { FileUploader } from './file-uploader';

export class S3FileUploader implements FileUploader {
  @Inject(S3Service)
  private readonly s3service: S3Service;
  upload(data: string, fileName: string): any {
    return this.s3service.uploadFile(fileName);
  }
}
