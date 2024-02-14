-- CreateTable
CREATE TABLE "AppUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "AppUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "appUserId" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "gpa" DECIMAL(65,30),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "description" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_email_key" ON "AppUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSkill_AB_unique" ON "_ResumeToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSkill_B_index" ON "_ResumeToSkill"("B");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_appUserId_fkey" FOREIGN KEY ("appUserId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
