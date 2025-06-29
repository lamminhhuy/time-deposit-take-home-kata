import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('time_deposits')
 class TimeDepositModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  planType: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  days: number;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  balance: number;
}

export default TimeDepositModel;