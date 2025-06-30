import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import TimeDepositModel from "./TimeDeposits.model";

@Entity('withdrawals')
class WithdrawalModel {
    @PrimaryGeneratedColumn('increment')
    id: number;
   @Column({
    type: 'integer',
    nullable: false,
   })
    timeDepositId: number;
   @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
   })
    amount: number;
   @Column({
    type: 'date',
    nullable: false,
   })
    date: Date;

    @ManyToOne(() => TimeDepositModel, (timeDeposit) => timeDeposit.withdrawals)
    timeDeposit: TimeDepositModel;
}
export default WithdrawalModel;