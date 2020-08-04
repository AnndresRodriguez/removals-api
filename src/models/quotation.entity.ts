import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn,
} from "typeorm";
import { ServiceEntity } from "./service.entity";
import { Country } from "./country.entity";


@Entity("quotation")
export class Quotation extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne((type) => Country)
  @JoinColumn({ name: "origin" })
  origin: Country;

  @OneToOne((type) => Country)
  @JoinColumn({ name: "destination" })
  destination: Country;

  @Column({ type: "varchar", length: 100 })
  name_user: string;
  @Column({ type: "varchar", length: 100 })
  mail_user: string;
  @Column({ type: "text" })
  description: string;
  @Column({ type: "varchar", length: 100 })
  phone_user: string;

  // Status 1: Attended, 0: Pending
  @Column({type: 'integer', default: 0})
  status: number;

  @ManyToMany((type) => ServiceEntity, { cascade: true })
  @JoinTable({ name: "quotation_service" })
  services: ServiceEntity[];

  @Column({type: 'datetime', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    @Column({type: 'datetime', name: 'updated_at', nullable: true })
    updatedAt: Date

   static findQuotationByID(id: number){
      return this.createQueryBuilder("quotation")
      .innerJoinAndSelect("quotation.services", "service")
      .where("quotation.id = :id", { id })
      .getOne();
   }
}
