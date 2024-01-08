import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./Shop";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // Relación Many-to-One con Shop
    @ManyToOne(() => Shop, shop => shop.users)
    @JoinColumn({ name: "shopId" })
    shop: Shop;

}