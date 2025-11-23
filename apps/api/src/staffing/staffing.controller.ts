import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { StaffingService } from './staffing.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { CreateStaffingRequestDto } from './dto/create-staffing-request.dto';

@Controller('staffing')
export class StaffingController {
  constructor(private readonly staffingService: StaffingService) {}

  @Get('roster')
  getRoster() {
    return this.staffingService.getRoster();
  }

  @Get('shifts')
  getShifts(
    @Query('userId') userId?: string,
    @Query('eventId') eventId?: string,
  ) {
    return this.staffingService.getShifts(userId, eventId);
  }

  @Post('shifts')
  createShift(@Body() createShiftDto: CreateShiftDto) {
    return this.staffingService.createShift(createShiftDto);
  }

  @Get('requests')
  getRequests() {
    return this.staffingService.getRequests();
  }

  @Post('requests')
  createRequest(@Body() createRequestDto: CreateStaffingRequestDto) {
    return this.staffingService.createRequest(createRequestDto);
  }
}
