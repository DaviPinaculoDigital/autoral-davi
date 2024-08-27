import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { PrismaModule } from "./persistence/database/prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        CoreModule
    ]
})
export class AppModule {}