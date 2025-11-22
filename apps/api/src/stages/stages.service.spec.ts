import { Test, TestingModule } from '@nestjs/testing';
import { StagesService } from './stages.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('StagesService', () => {
  let service: StagesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    stage: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StagesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<StagesService>(StagesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return stages', async () => {
      const result = [{ id: '1', name: 'Main Stage' }];
      jest.spyOn(prisma.stage, 'findMany').mockResolvedValue(result as any);

      expect(await service.list('event-1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a stage', async () => {
      const dto = { name: 'New Stage' };
      const result = { id: '1', ...dto };
      jest.spyOn(prisma.stage, 'create').mockResolvedValue(result as any);

      expect(await service.create('event-1', dto)).toBe(result);
    });
  });
});
