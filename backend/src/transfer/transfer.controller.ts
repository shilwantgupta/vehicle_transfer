import { Controller, Post, Get, Body } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { Transfer } from './transfer.entity';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) { }

  @Post()
  async transferVehicle(
    @Body('fromDriverId') fromDriverId: number,
    @Body('toDriverId') toDriverId: number,
    @Body('vehicleId') vehicleId: number,
  ): Promise<Transfer> {
    return this.transferService.transferVehicle(fromDriverId, toDriverId, vehicleId);
  }

  @Get()
  async getTransfer(): Promise<Transfer[]> {
    return this.transferService.getTransfer();
  }
}
