import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('EventsService', () => {
    let service: EventsService;
    let prisma: PrismaService;

    const mockPrismaService = {
        event: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('list', () => {
        it('should return an array of events', async () => {
            const result = [{ id: '1', name: 'Test Event' }];
            jest.spyOn(prisma.event, 'findMany').mockResolvedValue(result as any);

            expect(await service.list()).toBe(result);
        });
    });

    describe('get', () => {
        it('should return a single event', async () => {
            const result = { id: '1', name: 'Test Event' };
            jest.spyOn(prisma.event, 'findUnique').mockResolvedValue(result as any);

            expect(await service.get('1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new event', async () => {
            const dto = { name: 'New Event', slug: 'new-event' };
            const result = { id: '1', ...dto };
            jest.spyOn(prisma.event, 'create').mockResolvedValue(result as any);

            expect(await service.create(dto)).toBe(result);
        });
    });
});
