import { 
    Controller,
    Body,
    HttpCode,
    Get,
    Post,
    Put,
    UseGuards
 } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body() signAuthDto: LoginDto) {
        return this.authService.login(signAuthDto)
    }
}