import { FindCourseRequestDto } from '../requests/find-course-request-dto';

export class GenerateCourseraCategoryListCommand {
  constructor(public readonly findCourseRequest: FindCourseRequestDto) {}
}
