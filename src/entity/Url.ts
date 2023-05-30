import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    shortenedUrl: string;
  
    @Column()
    originalUrl: string;

}
