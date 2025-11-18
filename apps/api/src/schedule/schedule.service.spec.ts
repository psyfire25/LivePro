import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ScheduleService', () => {
    let service: ScheduleService;
    let prisma: PrismaService;

    const mockPrismaService = {
        scheduleItem: {
            findMany: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScheduleService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<ScheduleService>(ScheduleService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('list', () => {
        it('should return schedule items', async () => {
            const result = [{ id: '1', title: 'Test Item' }];
            jest.spyOn(prisma.scheduleItem, 'findMany').mockResolvedValue(result as any);

            expect(await service.list('event-1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a schedule item', async () => {
            const dto = { title: 'New Item', startTime: new Date(), endTime: new Date() };
            const result = { id: '1', ...dto };
            jest.spyOn(prisma.scheduleItem, 'create').mockResolvedValue(result as any);

            expect(await service.create('event-1', dto)).toBe(result);
        });
    });
});
