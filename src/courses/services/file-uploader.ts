export interface FileUploader {
  upload(data: string, fileName: string);
}

export const FileUploader = Symbol('FileUploader');
