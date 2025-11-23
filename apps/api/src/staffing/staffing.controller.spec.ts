import { Test, TestingModule } from '@nestjs/testing';
import { StaffingController } from './staffing.controller';

describe('StaffingController', () => {
  let controller: StaffingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffingController],
    }).compile();

    controller = module.get<StaffingController>(StaffingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
