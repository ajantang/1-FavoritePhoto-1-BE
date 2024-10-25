-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_shop_id_fkey";

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
