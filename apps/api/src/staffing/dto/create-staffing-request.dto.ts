import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateStaffingRequestDto {
    @IsString()
    eventId: string;

    @IsString()
    role: string;

    @IsInt()
    quantity: number;

    @IsOptional()
    @IsString()
    status?: string;
}
