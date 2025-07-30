/*
  Warnings:

  - You are about to drop the `AppUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppUserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AppUserRole";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "appuser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nonlocked" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "last_time_password_updated" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00',
    "password_never_expires" BOOLEAN NOT NULL DEFAULT false,
    "cannot_change_password" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "appuser_role" (
    "appuser_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    PRIMARY KEY ("appuser_id", "role_id"),
    CONSTRAINT "appuser_role_appuser_id_fkey" FOREIGN KEY ("appuser_id") REFERENCES "appuser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appuser_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appuser_id" INTEGER NOT NULL,
    "phone_country_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,
    CONSTRAINT "user_phone_appuser_id_fkey" FOREIGN KEY ("appuser_id") REFERENCES "appuser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "appuser_username_key" ON "appuser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");
