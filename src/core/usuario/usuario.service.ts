import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/persistence/database/prisma/prisma.service";
import * as bcrypt from "bcrypt"; 
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { EditarUsuarioDto } from "./dto/editar-usuario.dto";
import { AppErrorConflict } from "src/utils/errors/app-erros";
import { ListarUsuariosDto } from "./dto/listar-usuario.dto";


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

    // Listar Usuário
    async listarUsuarios(perfil: string, params: ListarUsuariosDto) {
        const pagina        = params.pagina ? +params.pagina : 1; 
        const quantidade    = params.quantidade ? +params.quantidade : 10; 
        const pesquisa      = params.pesquisa ? params.pesquisa : '';
        const status        = params.status ? params.status : 'todos'; 

        const where: Prisma.UsuarioWhereInput = {
            AND: [
                {
                    OR: [
                        {
                            email: {
                                contains: pesquisa,
                                mode: 'insensitive'
                            }
                        },
                        {
                            nome: { 
                                contains: pesquisa,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
                { perfil },
                status === 'todos' ? {} : { status }
            ]
        }

        const totalUsuarios = await this.prismaService.usuario.count({ where })
        const usuarios = await this.prismaService.usuario.findMany({
            where,
            skip: (pagina - 1) * quantidade,
            take: quantidade,
            select: this.selectQuery,
            orderBy: { id: 'desc' }
        })

        return {
            total: totalUsuarios,
            pagina,
            totalPaginas: Math.ceil(totalUsuarios / quantidade),
            pesquisa,
            status,
            usuarios
        }
    }
}