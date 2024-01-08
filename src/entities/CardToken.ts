import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryColumn } from "typeorm";


@Entity('tokens')
export class CardToken extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectId;
    @PrimaryColumn()
    token: string;
    @Column()
    expirationTime: number;
    @Column()
    privateKey: string;
    @Column()
    cardNumber: number;
    @Column()
    cvv: number;
    @Column()
    expirationMonth: string;
    @Column()
    expirationYear: string;
    @Column()
    email: string;
}