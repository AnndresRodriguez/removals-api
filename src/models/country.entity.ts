import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { City } from './city.entity'

@Entity('country')
export class Country extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 255})
    name: string;

    // Status 1: Active, 0: Inactive
    @Column({type: 'integer', default: 1})
    status: number;

    @OneToOne(type => City)
    @JoinColumn()
    city: City;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date


}