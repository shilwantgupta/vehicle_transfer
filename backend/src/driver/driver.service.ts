import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    private dataSource: DataSource, // Inject DataSource
  ) {
    this.queryRunner = this.dataSource.createQueryRunner(); // Use DataSource to create QueryRunner
  }

  async initializeTables() {
    await this.queryRunner.connect();

    // Create Driver table if it doesn't exist
    await this.queryRunner.query(`
     CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        profile_photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
    );
    `);
  }

  async create(driverData: Partial<Driver>): Promise<Driver> {
    const driver = this.driverRepository.create(driverData);
    return this.driverRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async findOne(id: number): Promise<Driver> {
    return this.driverRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.driverRepository.delete(id);
  }
}
