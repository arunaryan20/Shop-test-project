-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_shopId_fkey";

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "shopId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."shops"("id") ON DELETE SET NULL ON UPDATE CASCADE;
