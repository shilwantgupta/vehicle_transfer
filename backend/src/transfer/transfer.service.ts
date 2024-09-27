import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './transfer.entity';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) { }

  async transferVehicle(fromDriverId: number, toDriverId: number, vehicleId: number): Promise<Transfer> {
    const fromDriver = await this.driverRepository.findOne({ where: { id: fromDriverId } });
    const toDriver = await this.driverRepository.findOne({ where: { id: toDriverId } });
    const vehicle = await this.vehicleRepository.findOne({ where: { id: vehicleId } });

    if (!fromDriver || !toDriver || !vehicle) {
      throw new Error('Invalid data');
    }

    const transfer = this.transferRepository.create({
      fromDriver,
      toDriver,
      vehicle,
      transferDate: new Date(),
    });

    return this.transferRepository.save(transfer);
  }

  async getTransfer(): Promise<Transfer[]> {
    return this.transferRepository.find({ relations: ['fromDriver', 'toDriver', 'vehicle'] });
  }
}
