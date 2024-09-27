import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) { }

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
