import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'name' })
    name: string;

    @Column({ type: 'int', name: 'user_auth_id' })
    userAuthId: number;

    @Column({ type: 'varchar', name: 'phone_number', nullable: true })
    phoneNumber: string | null;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({name: 'user_auth_id'})
    user: UserEntity;

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