import { 
    IsNotEmpty,
    IsString,
    IsEmail,
    IsStrongPassword,
    IsOptional
 } from "class-validator";

 export class CriarUsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    senha: string;

    @IsString()
    @IsOptional()
    nome: string; 
 }