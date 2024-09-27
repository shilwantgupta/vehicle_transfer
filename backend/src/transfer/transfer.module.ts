import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { Driver } from 'src/driver/driver.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer, Driver, Vehicle])],
  providers: [TransferService],
  controllers: [TransferController]
})
export class TransferModule {}
