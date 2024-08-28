import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

export class ListarUsuariosDto {
    @IsOptional()
    @IsNumberString()
    pagina: string;

    @IsOptional()
    @IsNumberString()
    quantidade: string;

    @IsOptional()
    @IsString()
    pesquisa: string;

    @IsOptional()
    @IsString()
    @IsEnum(['todos', 'ativo', 'inativo'])
    status: string;
}