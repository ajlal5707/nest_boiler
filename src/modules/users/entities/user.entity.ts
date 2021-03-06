
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    role: string;
}
