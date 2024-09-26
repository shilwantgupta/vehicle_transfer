import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'vehicle_transfer',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,  // Be careful with this in production!
    }),
    DriverModule,
    VehicleModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
