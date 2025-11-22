import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    workspace: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should return workspaces', async () => {
      const result = [{ id: '1', name: 'Test Workspace' }];
      jest.spyOn(prisma.workspace, 'findMany').mockResolvedValue(result as any);

      expect(await service.list()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a workspace', async () => {
      const dto = { name: 'New Workspace', slug: 'new-workspace' };
      const result = { id: '1', ...dto };
      jest.spyOn(prisma.workspace, 'create').mockResolvedValue(result as any);

      expect(await service.create(dto)).toBe(result);
    });
  });
});
