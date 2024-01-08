import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity('shops')
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shopName: string;

    @Column()
    privateKey: string;

    // Relación One-to-Many con User
    @OneToMany(() => User, user => user.shop)
    users: User[];
}