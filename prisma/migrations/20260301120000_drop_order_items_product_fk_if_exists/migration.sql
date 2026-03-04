-- Order items store frontend product ids (e.g. ad01, p01), not DB cuids.
-- Drop FK so P2003 does not occur when placing orders.
ALTER TABLE "order_items" DROP CONSTRAINT IF EXISTS "order_items_productId_fkey";
