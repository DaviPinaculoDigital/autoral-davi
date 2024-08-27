import { 
    Controller,
    Body, 
    Get, 
    Post, 
    Put 
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // Criar Usuário
    @Post('/')
    async criarUsuario(@Body() params: CriarUsuarioDto) {
        return this.usuarioService.criarUsuario(params); 
    }

    @Get('/')
    ola() {
        return 'ola'; 
    }

}