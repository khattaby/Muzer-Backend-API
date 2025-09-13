-- AlterEnum
ALTER TYPE "public"."Provider" ADD VALUE 'Credentials';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT;
