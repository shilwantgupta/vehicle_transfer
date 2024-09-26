import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) { }

  @Get()
  async getAllVehicles(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Post()
  async createVehicle(@Body() vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehicleService.create(vehicleData);
  }

  @Get(':id')
  async getVehicle(@Param('id') id: number): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @Delete(':id')
  async deleteVehicle(@Param('id') id: number): Promise<void> {
    return this.vehicleService.remove(id);
  }
}
