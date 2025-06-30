import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import WithdrawalModel from "./Withdrawals.models";

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
    type: 'numeric',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  balance: number;

  @OneToMany(() => WithdrawalModel, (withdrawal) => withdrawal.timeDeposit)
  withdrawals: WithdrawalModel[];
}

export default TimeDepositModel;