import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FilterNotificationsDto } from './dto/filter-notifications.dto';
import { NotificationEntity } from './entities/notification.entity';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly service: NotificationsService) { }

    @Post()
    @ApiCreatedResponse({ type: NotificationEntity })
    create(@Body() dto: CreateNotificationDto) {
        return this.service.create(dto);
    }

    @Get('user/:userId')
    @ApiOkResponse({ type: NotificationEntity, isArray: true })
    findByUser(
        @Param('userId') userId: string,
        @Query() filter: FilterNotificationsDto,
    ) {
        return this.service.findByUser(userId, filter);
    }

    @Get('user/:userId/count')
    @ApiOkResponse({ type: Number })
    getUnreadCount(@Param('userId') userId: string) {
        return this.service.getUnreadCount(userId);
    }

    @Patch('user/:userId/mark-all-read')
    @HttpCode(HttpStatus.NO_CONTENT)
    markAllAsRead(@Param('userId') userId: string) {
        return this.service.markAllAsRead(userId);
    }

    @Patch(':id')
    @ApiOkResponse({ type: NotificationEntity })
    update(
        @Param('id') id: string,
        @Query('userId') userId: string,
        @Body() dto: UpdateNotificationDto,
    ) {
        return this.service.update(id, userId, dto);
    }

    @Patch(':id/read')
    @HttpCode(HttpStatus.NO_CONTENT)
    markAsRead(@Param('id') id: string, @Query('userId') userId: string) {
        return this.service.markAsRead(id, userId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string, @Query('userId') userId: string) {
        return this.service.delete(id, userId);
    }
}
