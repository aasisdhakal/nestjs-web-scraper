import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseCommandHandlers } from './commands';
import { CourseMiddleware } from './middleware/CourseMiddleware';
import { CourseraScrapper } from './services/coursera-scrapper';
import { LocalFileUploader } from './services/local-file-uploader';
import { FileUploader } from './services/file-uploader';
import { CsvGenerator } from './services/csv-generator';

@Module({
  imports: [CqrsModule],
  controllers: [CourseController],
  providers: [
    ...CourseCommandHandlers,
    CourseraScrapper,
    CsvGenerator,
    {
      provide: FileUploader,
      useClass: LocalFileUploader,
    },
  ],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CourseMiddleware).forRoutes('courses');
  }
}
