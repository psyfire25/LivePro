import { Test, TestingModule } from '@nestjs/testing';
import { StaffingService } from './staffing.service';

describe('StaffingService', () => {
  let service: StaffingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffingService],
    }).compile();

    service = module.get<StaffingService>(StaffingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
