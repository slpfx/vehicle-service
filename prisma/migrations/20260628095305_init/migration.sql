-- CreateTable
CREATE TABLE "Vihecle" (
    "id" SERIAL NOT NULL,
    "made" TEXT NOT NULL DEFAULT 'unknown',
    "model" TEXT NOT NULL DEFAULT 'unknown',
    "year" INTEGER,

    CONSTRAINT "Vihecle_pkey" PRIMARY KEY ("id")
);
