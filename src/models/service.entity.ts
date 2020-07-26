import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('service')
export class ServiceEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 100})
    name: string;

    // Status 1: Active, 0: Inactive
    @Column({type: 'integer', default: 1})
    status: number;

    @Column({type: 'datetime', name: 'created_at' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at' })
    updatedAt: Date
}