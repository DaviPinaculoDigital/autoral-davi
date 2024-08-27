import { 
    IsNotEmpty,
    IsString,
    IsEmail,
    IsOptional
 } from "class-validator";

 export class EditarUsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    nome: string; 
 }