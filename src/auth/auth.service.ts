import { Injectable } from "@nestjs/common";
import { Usuario } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { Payload } from "./entities/payload.entity";
import { PrismaService } from "src/persistence/database/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AppErrorUnauthorized } from "src/utils/errors/app-erros";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}
    
    private async validarEGerarToken(
        usuario: Usuario,
        senhaParaValidacao: string,
        tipoToken: 'access' | 'reset'
    ): Promise<string> {
        const { senha } = usuario;

        if (tipoToken == 'access') {
            const senhaValida = await bcrypt.compare(senhaParaValidacao, senha)
            if (!senhaValida) 
                throw new AppErrorUnauthorized('Credenciais inválidas'); 
        }

        const payload: Payload = {
            sub: usuario.id
        }

        let token: string;

        if (tipoToken === 'reset') {
            payload.reset = true;
            token = this.jwtService.sign(payload, {
                expiresIn: '4h',
                secret: process.env.JWT_RESET_SECRET 
            })

            return token; 
        }

        token = this.jwtService.sign(payload, {
            expiresIn: '30d',
            secret: process.env.JWT_SECRET
        })

        return token; 
    }

    async login(signAuthDto: LoginDto) {
        const { email, senha } = signAuthDto; 

        try {
            const usuario = await this.prismaService.usuario.findUnique({
                where: {
                    email
                }
            })

            if (!usuario)
                throw new AppErrorUnauthorized('Credenciais inválidas.'); 

            const token = await this.validarEGerarToken(usuario, senha, 'access');
            
            return {
                token,
                perfil: usuario.perfil,
                nome: usuario.nome || null,
                id: usuario.id 
            };
        } catch (error) {
            throw error; 
        }
    }


}