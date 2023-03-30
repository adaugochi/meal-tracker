import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserEntity} from "../users/user.entity";
import {EmployeeEntity} from "./employee.entity";

@Entity({ name: 'employee_meals' })
export class EmployeeMealEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'code' })
    code: string;

    @Column({ type: 'int', name: 'employee_id' })
    employeeId: number;

    @Column({ type: 'tinyint', name: 'status' })
    status: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}