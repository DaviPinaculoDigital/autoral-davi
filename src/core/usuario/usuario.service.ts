import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/persistence/database/prisma/prisma.service";
import * as bcrypt from "bcrypt"; 
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { EditarUsuarioDto } from "./dto/editar-usuario.dto";
import { AppErrorConflict } from "src/utils/errors/app-erros";


@Injectable()
export class UsuarioService {
    constructor(private readonly prismaService: PrismaService) {}

    private selectQuery: Prisma.UsuarioSelect = {
        id: true, 
        email: true,
        nome: true, 
        status: true,
        perfil: true, 
        criadoEm: true, 
        atualizadoEm: true
    };

    // Criar Usuário
    async criarUsuario(criarUsuarioDto: CriarUsuarioDto) {
        const hash = await bcrypt.hash(criarUsuarioDto.senha, 10); 

        return await this.prismaService.usuario.create({
            data: {
                email: criarUsuarioDto.email, 
                senha: hash,
                nome: criarUsuarioDto.nome
            },
            select: this.selectQuery
        });
    }

    // Editar Usuário
    async editarUsuario(usuarioIdEditar: number, params: EditarUsuarioDto) {
        const { email, nome } = params
        
        if (email) {
            const usuario = await this.prismaService.usuario.findUnique({
                where: {email: params.email}
            })

            if (usuario && usuario.id !== usuarioIdEditar)
                throw new AppErrorConflict('Email já cadastrado.'); 
        }
    
        return await this.prismaService.usuario.update({
            where: {id: usuarioIdEditar},
            data: { email, nome },
            select: this.selectQuery
        })
    }
}