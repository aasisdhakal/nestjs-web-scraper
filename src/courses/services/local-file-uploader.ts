import { Injectable } from '@nestjs/common';
import { FileUploader } from './file-uploader';
import * as fs from 'fs';
import { createSlug } from '../../helpers';
import * as url from 'url';

@Injectable()
export class LocalFileUploader implements FileUploader {
  upload(csv: string, name: string): URL {
    const filePath = 'assets/';
    const fileName = filePath + createSlug(name) + Date.now() + '.csv';
    fs.writeFileSync(fileName, csv);
    return url.pathToFileURL(fileName);
  }
}
