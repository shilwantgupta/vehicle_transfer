import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver)
  fromDriver: Driver;

  @ManyToOne(() => Driver)
  toDriver: Driver;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column()
  transferDate: Date;
}
