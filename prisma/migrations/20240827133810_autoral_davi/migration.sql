-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(200) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "perfil" TEXT NOT NULL DEFAULT 'usuario',
    "nome" VARCHAR(200),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");
