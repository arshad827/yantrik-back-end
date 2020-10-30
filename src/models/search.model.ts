import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity('rovr-search')
export class RovrSearch {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    type: string
    
    @Column()
    key: string


}