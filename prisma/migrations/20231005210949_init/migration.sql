-- CreateTable
CREATE TABLE "Author" (
    "id" UUID DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "yearsActive" INT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "currencyId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "BookAuthors" (
    "bookId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "BookAuthors_pkey" PRIMARY KEY ("bookId","authorId")
);

-- CreateTable
CREATE TABLE "BookCategories" (
    "id" UUID NOT NULL,
    "bookId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "BookCategories_pkey" PRIMARY KEY ("bookId","categoryId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL,
    "name" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "bookId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("bookId","userId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserBooks" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "bookId" UUID NOT NULL,

    CONSTRAINT "UserBooks_pkey" PRIMARY KEY ("bookId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_id_key" ON "Author"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_id_key" ON "Book"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Book_currencyId_key" ON "Book"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "BookCategories_id_key" ON "BookCategories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_id_key" ON "Currency"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_key" ON "Rating"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserBooks_id_key" ON "UserBooks"("id");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthors" ADD CONSTRAINT "BookAuthors_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookAuthors" ADD CONSTRAINT "BookAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategories" ADD CONSTRAINT "BookCategories_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCategories" ADD CONSTRAINT "BookCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBooks" ADD CONSTRAINT "UserBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
