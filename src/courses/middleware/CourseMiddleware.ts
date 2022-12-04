import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createSlug } from '../../helpers';

@Injectable()
export class CourseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const categories = [
      'data-science',
      'arts-and-humanities',
      'business',
      'computer-science',
      'health',
      'information-technology',
      'language-learning',
      'math-and-logic',
      'personal-development',
      'physical-science-and-engineering',
      'social-sciences',
    ];
    if (!categories.includes(createSlug(req.query.category))) {
      throw new HttpException(
        { message: 'Invalid Category Provided' },
        HttpStatus.NOT_FOUND,
      );
    }
    next();
  }
}
