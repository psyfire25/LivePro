import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
    let controller: EventsController;
    let service: EventsService;

    const mockEventsService = {
        list: jest.fn(),
        get: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [
                {
                    provide: EventsService,
                    useValue: mockEventsService,
                },
            ],
        }).compile();

        controller = module.get<EventsController>(EventsController);
        service = module.get<EventsService>(EventsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('list', () => {
        it('should return an array of events', async () => {
            const result = [{ id: '1', name: 'Test Event' }];
            jest.spyOn(service, 'list').mockResolvedValue(result as any);

            expect(await controller.list()).toBe(result);
        });
    });

    describe('get', () => {
        it('should return a single event', async () => {
            const result = { id: '1', name: 'Test Event' };
            jest.spyOn(service, 'get').mockResolvedValue(result as any);

            expect(await controller.get('1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new event', async () => {
            const dto = { name: 'New Event', slug: 'new-event' };
            const result = { id: '1', ...dto };
            jest.spyOn(service, 'create').mockResolvedValue(result as any);

            expect(await controller.create(dto)).toBe(result);
        });
    });
});
