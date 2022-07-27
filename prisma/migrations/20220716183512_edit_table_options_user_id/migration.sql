-- AlterTable
ALTER TABLE "options" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
