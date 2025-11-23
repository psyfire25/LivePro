import { Test, TestingModule } from '@nestjs/testing';
import { StaffingService } from './staffing.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('StaffingService', () => {
  let service: StaffingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffingService,
        {
          provide: PrismaService,
          useValue: {
            user: { findMany: jest.fn() },
            shift: { findMany: jest.fn(), create: jest.fn() },
            staffingRequest: { findMany: jest.fn(), create: jest.fn() },
          },
        },
      ],
    }).compile();

    service = module.get<StaffingService>(StaffingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
