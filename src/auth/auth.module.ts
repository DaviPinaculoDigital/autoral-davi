import { Module, Global } from "@nestjs/common"; 
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {}