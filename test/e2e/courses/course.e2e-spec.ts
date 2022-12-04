import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CourseModule } from '../../../src/courses/course.module';
import { CourseraScrapper } from '../../../src/courses/services/coursera-scrapper';

describe('Courses (e2e)', () => {
  let app: INestApplication;

  const courseraScrapperMockData = [
    {
      title: 'Google Data Analytics',
      description: "Skills you'll gain: Data Analysis",
      provider: 'Google',
      rating: '4.4',
      duration: '6-7 months',
    },
  ];
  const courseraScrapperMock = {
    generateCategoryList: () => courseraScrapperMockData,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CourseModule],
    })
      .overrideProvider(CourseraScrapper)
      .useValue(courseraScrapperMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET /courses?category=test  requires valid category`, () => {
    return request(app.getHttpServer())
      .get('/courses?category=test')
      .expect(404);
  });

  it(`/GET courses Csv Link`, () => {
    return request(app.getHttpServer())
      .get('/courses?category=Data%20Science')
      .expect(200)
      .expect((res) => {
        expect(res.body.link).toContain('.csv');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
