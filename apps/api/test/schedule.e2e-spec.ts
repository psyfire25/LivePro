import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ScheduleController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/events/:eventId/schedule (GET)', () => {
        it('should return 200 or 404', () => {
            return request(app.getHttpServer())
                .get('/events/non-existent-id/schedule')
                .expect((res) => {
                    if (res.status !== 200 && res.status !== 404) throw new Error('Unexpected status code');
                });
        });
    });
});
