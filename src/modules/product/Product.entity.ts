import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Indicator } from '../indicator';
import { Team } from '../team';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nom_service_public_numerique: string;

    @Column({ nullable: true })
    metabaseVersion?: string;

    @Column('float', { nullable: true })
    percentageSignedCommits?: number;

    @OneToMany(() => Indicator, (indicator) => indicator.product)
    indicators: Indicator[];

    @ManyToOne(() => Team, { onDelete: 'CASCADE' })
    team: Team;
}
