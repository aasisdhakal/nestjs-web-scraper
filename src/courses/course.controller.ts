import { Controller, Get, Query } from '@nestjs/common';
import { FindCourseRequestDto } from './requests/find-course-request-dto';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateCourseraCategoryListCommand } from './commands/generate-coursera-category-list.command';

@Controller('courses')
export class CourseController {
  constructor(private readonly commandBus: CommandBus) {}
  @Get()
  async findByName(@Query() findCourseRequestDto: FindCourseRequestDto) {
    return await this.commandBus.execute(
      new GenerateCourseraCategoryListCommand(findCourseRequestDto),
    );
  }
}
