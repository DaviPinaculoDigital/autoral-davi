import { 
    Controller,
    Body, 
    Get, 
    Post, 
    Put, 
    UseGuards,
    Query
} from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { CriarUsuarioDto } from "./dto/criar-usuario.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { EditarUsuarioDto } from "./dto/editar-usuario.dto";
import { UsuarioId } from "src/auth/decorators/usuario-id.decorator";
import { ListarUsuariosDto } from "./dto/listar-usuario.dto";
import { USUARIO_PERFIL } from "./enum/perfil.enum";

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    // Criar Usuário
    @Post('/')
    async criarUsuario(@Body() params: CriarUsuarioDto) {
        return this.usuarioService.criarUsuario(params); 
    }
  
    // Editar Usuário 
    @UseGuards(JwtAuthGuard)
    @Put('/editar')
    async editarUsuario(@Body() params: EditarUsuarioDto, @UsuarioId() usuarioIdLogado: number) {
        return this.usuarioService.editarUsuario(usuarioIdLogado, params); 
    }

    // Listar Usuários
    @Get('/listar')
    async listarUsuarios(@Query() query: ListarUsuariosDto) {
        return this.usuarioService.listarUsuarios(USUARIO_PERFIL.USUARIO, query)
    }

}