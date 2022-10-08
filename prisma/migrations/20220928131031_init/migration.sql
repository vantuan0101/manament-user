-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "avatar" JSONB[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
