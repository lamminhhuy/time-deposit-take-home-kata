import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
export default WithdrawalModel;