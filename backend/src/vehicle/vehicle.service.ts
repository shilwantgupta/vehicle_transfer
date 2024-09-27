import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    private dataSource: DataSource, // Inject DataSource
  ) {
    this.queryRunner = this.dataSource.createQueryRunner(); // Use DataSource to create QueryRunner
  }

  async initializeTables() {
    await this.queryRunner.connect();

    // Create Vehicle table if it doesn't exist
    await this.queryRunner.query(`
     CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_number VARCHAR(255) NOT NULL,
        vehicle_type VARCHAR(255) NOT NULL,
        puc_certificate VARCHAR(255) NOT NULL,
        insurance_certificate VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
    );
    `);
  }

  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(vehicleData);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
