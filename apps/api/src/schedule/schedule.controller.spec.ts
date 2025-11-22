import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

describe('ScheduleController', () => {
  let controller: ScheduleController;
  let service: ScheduleService;

  const mockScheduleService = {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        {
          provide: ScheduleService,
          useValue: mockScheduleService,
        },
      ],
    }).compile();

    controller = module.get<ScheduleController>(ScheduleController);
    service = module.get<ScheduleService>(ScheduleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return schedule items', async () => {
      const result = [{ id: '1', title: 'Test Item' }];
      jest.spyOn(service, 'list').mockResolvedValue(result as any);

      expect(await controller.list('event-1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a schedule item', async () => {
      const dto = {
        title: 'New Item',
        startTime: new Date(),
        endTime: new Date(),
      };
      const result = { id: '1', ...dto };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create('event-1', dto)).toBe(result);
    });
  });
});
