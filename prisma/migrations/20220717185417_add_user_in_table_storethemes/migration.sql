-- AlterTable
ALTER TABLE "store_colors" ADD COLUMN     "type" TEXT,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "store_colors" ADD CONSTRAINT "store_colors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
