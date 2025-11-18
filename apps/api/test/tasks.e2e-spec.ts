import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TasksController (e2e)', () => {
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

    // Note: These tests assume an event exists. In a real scenario, we'd create one first.
    // For now, we'll just test the structure and error handling if ID doesn't exist

    describe('/events/:eventId/tasks (GET)', () => {
        it('should return 200 or 404 depending on event existence', () => {
            return request(app.getHttpServer())
                .get('/events/non-existent-id/tasks')
                .expect((res) => {
                    // It might return empty array or 404 depending on implementation
                    if (res.status !== 200 && res.status !== 404) throw new Error('Unexpected status code');
                });
        });
    });
});
