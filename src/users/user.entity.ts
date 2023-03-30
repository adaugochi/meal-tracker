import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserTypeEntity} from "./user-type.entity";

@Entity({ name: 'user_credentials' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'email', unique: true })
    email: string;

    @Column({ type: 'varchar', name: 'password' })
    password: string;

    @Column({ type: 'int', name: 'user_type_id' })
    userTypeId: number;

    @Column({ type: 'varchar', name: 'status' })
    status: string;

    @Column({ type: 'tinyint', name: 'active' })
    active: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}

export enum UserStatusEnum {
    YES = 1,
    NO = 0
}
