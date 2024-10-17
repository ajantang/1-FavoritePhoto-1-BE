/*
  Warnings:

  - A unique constraint covering the columns `[user_id,card_id]` on the table `own` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "own_user_id_card_id_key" ON "own"("user_id", "card_id");
