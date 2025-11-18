import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('TasksService', () => {
    let service: TasksService;
    let prisma: PrismaService;

    const mockPrismaService = {
        task: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: PrismaService,
                    useValue: mockPrismaService,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('list', () => {
        it('should return an array of tasks', async () => {
            const result = [{ id: '1', title: 'Test Task' }];
            jest.spyOn(prisma.task, 'findMany').mockResolvedValue(result as any);

            expect(await service.list('event-1')).toBe(result);
        });
    });

    describe('create', () => {
        it('should create a new task', async () => {
            const dto = { title: 'New Task', description: 'Test Description' };
            const result = { id: '1', ...dto };
            jest.spyOn(prisma.task, 'create').mockResolvedValue(result as any);

            expect(await service.create('event-1', dto)).toBe(result);
        });
    });

    describe('updateStatus', () => {
        it('should update task status', async () => {
            const dto = { status: 'COMPLETED' };
            const result = { id: '1', title: 'Test Task', status: 'COMPLETED' };
            jest.spyOn(prisma.task, 'update').mockResolvedValue(result as any);

            expect(await service.updateStatus('event-1', 'task-1', dto)).toBe(result);
        });
    });
});
