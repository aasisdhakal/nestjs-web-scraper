import { IsString } from 'class-validator';

export class FindCourseRequestDto {
  @IsString()
  public category!: string;
}
