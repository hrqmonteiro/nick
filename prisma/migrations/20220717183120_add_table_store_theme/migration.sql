-- CreateTable
CREATE TABLE "store_colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "theme" TEXT,
    "colorNavbar" TEXT,
    "colorBackground" TEXT,
    "colorDrawer" TEXT,
    "colorFooter" TEXT,
    "head" TEXT,
    "footer" TEXT,
    "address" TEXT,
    "schedule" TEXT,
    "path" TEXT,
    "slug" TEXT,
    "status" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_colors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_colors_slug_key" ON "store_colors"("slug");
