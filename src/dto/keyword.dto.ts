import { IsNotEmpty } from 'class-validator';

export class KeywordDto {
    
    @IsNotEmpty()
    type: string
    
    @IsNotEmpty()
    key: string
    
}