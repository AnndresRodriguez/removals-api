import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contact')
export class Contact extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 100})
    name: string;
    @Column({type: 'varchar', length: 100})
    mail: string;
    @Column({type: 'varchar', length: 255})
    affair: string;
    @Column({type: 'text'})
    message: string;

    // Status 1: Attended, 0: Pending
    @Column({type: 'integer', default: 0})
    status: number;

    @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

}