import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'user_types' })
export class UserTypeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'key', unique: true })
    key: string;

    @Column({ type: 'varchar', name: 'name' })
    name: string;

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

export enum UserTypeEnum {
    ADMIN = 'admin',
    CATERER = 'caterer',
    EMPLOYEE = 'employee'
}
