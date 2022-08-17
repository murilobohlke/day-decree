-- CreateTable
CREATE TABLE "decrees" (
    "id" TEXT NOT NULL,
    "count" SERIAL NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "decrees_pkey" PRIMARY KEY ("id")
);
