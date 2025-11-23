import { Test, TestingModule } from '@nestjs/testing';
import { StaffingController } from './staffing.controller';
import { StaffingService } from './staffing.service';

describe('StaffingController', () => {
  let controller: StaffingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffingController],
      providers: [
        {
          provide: StaffingService,
          useValue: {
            getRoster: jest.fn(),
            getShifts: jest.fn(),
            createShift: jest.fn(),
            getRequests: jest.fn(),
            createRequest: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StaffingController>(StaffingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
