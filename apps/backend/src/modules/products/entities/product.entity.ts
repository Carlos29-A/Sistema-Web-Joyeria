import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductStatus {
  ACTIVE = 'active',
  DRAFT = 'draft',
  INACTIVE = 'inactive',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('simple-array')
  images!: string[];

  @Column({ default: 0 })
  stock!: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.DRAFT })
  status!: ProductStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  categoryId!: string;

  //Relaciones
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;
}
