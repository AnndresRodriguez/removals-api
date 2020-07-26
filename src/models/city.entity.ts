import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity('city')
export class City extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 255})
    name: string;

    // Status 1: Active, 0: Inactive
    @Column({type: 'integer', default: 1})
    status: number;

    @Column({type: 'datetime', name: 'created_at' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at' })
    updatedAt: Date


   

}