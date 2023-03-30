import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";

@Entity({ name: 'employees' })
export class EmployeeEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'name' })
    name: string;

    @Column({ type: 'tinyint', name: 'active' })
    active: number;

    @Column({ type: 'varchar', name: 'identity' })
    identity: string;

    @Column({ type: 'varchar', name: 'job_title' })
    jobTitle: string;

    @Column({ type: 'int', name: 'user_auth_id' })
    userAuthId: number;

    @Column({ type: 'varchar', name: 'phone_number', nullable: true })
    phoneNumber: string | null;

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