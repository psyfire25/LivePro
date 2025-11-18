import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
    let controller: TasksController;
    let service: TasksService;

    const mockTasksService = {
        list: jest.fn(),
        create: jest.fn(),
        updateStatus: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: mockTasksService,
                },
            ],
        }).compile();

        controller = module.get<TasksController>(TasksController);
        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('list', () => {
        it('should return an array of tasks', async () => {
            const result = [{ id: '1', title: 'Test Task' }];
            jest.spyOn(service, 'list').mockResolvedValue(result as any);

            expect(await controller.list('event-1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new task', async () => {
            const dto = { title: 'New Task', description: 'Test Description' };
            const result = { id: '1', ...dto };
            jest.spyOn(service, 'create').mockResolvedValue(result as any);

            expect(await controller.create('event-1', dto)).toBe(result);
        });
    });

    describe('updateStatus', () => {
        it('should update task status', async () => {
            const dto = { status: 'COMPLETED' };
            const result = { id: '1', title: 'Test Task', status: 'COMPLETED' };
            jest.spyOn(service, 'updateStatus').mockResolvedValue(result as any);

            expect(await controller.updateStatus('event-1', 'task-1', dto)).toBe(result);
        });
    });
});
