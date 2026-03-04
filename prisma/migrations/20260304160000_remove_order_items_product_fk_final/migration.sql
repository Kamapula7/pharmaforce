-- Drop ALL foreign keys on order_items.productId unconditionally
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    WHERE tc.table_schema = 'public'
      AND tc.table_name = 'order_items'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'productId'
  LOOP
    EXECUTE format('ALTER TABLE order_items DROP CONSTRAINT %I', r.constraint_name);
  END LOOP;
END $$;
