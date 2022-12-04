import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateCourseraCategoryListCommand } from './generate-coursera-category-list.command';
import { CourseraScrapper } from '../services/coursera-scrapper';
import { FileUploader } from '../services/file-uploader';
import { Inject } from '@nestjs/common';
import { CsvGenerator } from '../services/csv-generator';
@CommandHandler(GenerateCourseraCategoryListCommand)
export class GenerateCourseraCategoryListHandler implements ICommandHandler {
  constructor(
    @Inject(FileUploader) private readonly uploader: FileUploader,
    private readonly scrapperService: CourseraScrapper,
    private readonly csvGenerator: CsvGenerator,
  ) {}
  async execute({
    findCourseRequest,
  }: GenerateCourseraCategoryListCommand): Promise<Record<string, string>> {
    const { category } = findCourseRequest;
    const scrappedData = await this.scrapperService.generateCategoryList(
      category,
    );
    if (scrappedData) {
      const csvData = this.csvGenerator.convertJsonToCsv(scrappedData);
      const uploadedFileLink = await this.uploader.upload(csvData, category);
      return { link: uploadedFileLink };
    }
  }
}
