import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Quotation } from './quotation.entity';

@Entity('service')
export class ServiceEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 100})
    name: string;

    // Status 1: Active, 0: Inactive
    @Column({type: 'integer', default: 1})
    status: number;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

    @ManyToMany(type => Quotation, quotation => quotation.services)
    quotations: Quotation[];

    
}