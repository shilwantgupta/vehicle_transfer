import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from './driver.entity';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Get()
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Post()
  async createDriver(@Body() driverData: Partial<Driver>): Promise<Driver> {
    return this.driverService.create(driverData);
  }

  @Get(':id')
  async getDriver(@Param('id') id: number): Promise<Driver> {
    return this.driverService.findOne(id);
  }

  @Delete(':id')
  async deleteDriver(@Param('id') id: number): Promise<void> {
    return this.driverService.remove(id);
  }
}
