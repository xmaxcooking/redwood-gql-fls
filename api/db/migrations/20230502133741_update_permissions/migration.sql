/*
  Warnings:

  - You are about to drop the column `role` on the `UserPostPermission` table. All the data in the column will be lost.
  - Added the required column `permission` to the `UserPostPermission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPostPermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "permission" TEXT NOT NULL,
    CONSTRAINT "UserPostPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserPostPermission_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserPostPermission" ("createdAt", "id", "postId", "updatedAt", "userId") SELECT "createdAt", "id", "postId", "updatedAt", "userId" FROM "UserPostPermission";
DROP TABLE "UserPostPermission";
ALTER TABLE "new_UserPostPermission" RENAME TO "UserPostPermission";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
