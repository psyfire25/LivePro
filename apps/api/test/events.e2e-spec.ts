import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
const request = require('supertest');
import { AppModule } from '../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('EventsController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/events (GET)', () => {
        it('should return an array of events', () => {
            return request(app.getHttpServer())
                .get('/events')
                .expect(200);
        });
    });

    describe('/events (POST)', () => {
        it('should create a new event', () => {
            const now = new Date();
            const dto = {
                name: 'E2E Test Event',
                type: 'CONCERT',
                startAt: now.toISOString(),
                endAt: new Date(now.getTime() + 60 * 60 * 1000).toISOString(),
            };
            return request(app.getHttpServer())
                .post('/events')
                .send(dto)
                .expect(201)
                .then((res) => {
                    expect(res.body.name).toBe(dto.name);
                    expect(res.body.type).toBe(dto.type);
                });
        });
    });
});
