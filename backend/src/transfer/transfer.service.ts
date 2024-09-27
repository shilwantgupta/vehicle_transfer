import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { Transfer } from './transfer.entity';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Injectable()
export class TransferService {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private dataSource: DataSource, // Inject DataSource
  ) { 
    this.queryRunner = this.dataSource.createQueryRunner(); // Use DataSource to create QueryRunner
  }

  async initializeTables() {
    await this.queryRunner.connect();

    // Create Transfer table if it doesn't exist
    await this.queryRunner.query(`
      CREATE TABLE IF NOT EXISTS transfers (
        id SERIAL PRIMARY KEY,
        from_driver_id INTEGER NOT NULL,
        to_driver_id INTEGER NOT NULL,
        vehicle_id INTEGER NOT NULL,
        transfer_date TIMESTAMP DEFAULT NOW(),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
        FOREIGN KEY (from_driver_id) REFERENCES drivers(id),
        FOREIGN KEY (to_driver_id) REFERENCES drivers(id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
    );
    `);
  }

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
