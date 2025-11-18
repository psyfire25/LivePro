import { Test, TestingModule } from '@nestjs/testing';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';

describe('StagesController', () => {
    let controller: StagesController;
    let service: StagesService;

    const mockStagesService = {
        list: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StagesController],
            providers: [
                {
                    provide: StagesService,
                    useValue: mockStagesService,
                },
            ],
        }).compile();

        controller = module.get<StagesController>(StagesController);
        service = module.get<StagesService>(StagesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('list', () => {
        it('should return stages', async () => {
            const result = [{ id: '1', name: 'Main Stage' }];
            jest.spyOn(service, 'list').mockResolvedValue(result as any);

            expect(await controller.list('event-1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a stage', async () => {
            const dto = { name: 'New Stage' };
            const result = { id: '1', ...dto };
            jest.spyOn(service, 'create').mockResolvedValue(result as any);

            expect(await controller.create('event-1', dto)).toBe(result);
        });
    });
});
