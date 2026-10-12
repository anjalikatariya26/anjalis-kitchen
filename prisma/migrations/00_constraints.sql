-- =========================================================
-- Anjali's Kitchen — Raw SQL Constraints
-- Applied after prisma migrate dev, before seeding.
-- 
-- These constraints enforce rules that Prisma's schema
-- language cannot express natively.
-- =========================================================

-- 1. Enable citext extension for case-insensitive email
CREATE EXTENSION IF NOT EXISTS citext;

-- 2. Enable pg_trgm for search_text trigram index
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 3. Partial unique index: one name_key per food_type among non-deleted products
-- Prevents "Besan Laddu" (REGULAR) and "Besan Laddu" (REGULAR) from coexisting
CREATE UNIQUE INDEX IF NOT EXISTS products_name_key_food_type_unique
  ON products (name_key, food_type)
  WHERE deleted_at IS NULL;

-- 4. Trigram GIN index on search_text for fast ILIKE search
CREATE INDEX IF NOT EXISTS products_search_text_trgm_idx
  ON products
  USING GIN (search_text gin_trgm_ops);

-- 5. CHECK: product image position is 0 or 1 (max 2 images)
ALTER TABLE product_images
  DROP CONSTRAINT IF EXISTS product_images_position_check;
ALTER TABLE product_images
  ADD CONSTRAINT product_images_position_check
  CHECK (position >= 0 AND position <= 1);

-- 6. CHECK: hamper image position is 0 or 1 (max 2 images)
ALTER TABLE hamper_images
  DROP CONSTRAINT IF EXISTS hamper_images_position_check;
ALTER TABLE hamper_images
  ADD CONSTRAINT hamper_images_position_check
  CHECK (position >= 0 AND position <= 1);

-- 7. CHECK: hamper_items quantity is positive
ALTER TABLE hamper_items
  DROP CONSTRAINT IF EXISTS hamper_items_quantity_check;
ALTER TABLE hamper_items
  ADD CONSTRAINT hamper_items_quantity_check
  CHECK (quantity > 0);

-- 8. Unique variant per product: (product_id, unit, quantity_value)
CREATE UNIQUE INDEX IF NOT EXISTS product_variants_product_unit_qty_unique
  ON product_variants (product_id, unit, quantity_value);

-- 9. CHECK: compare_at_price_paise > price_paise when both are set
ALTER TABLE product_variants
  DROP CONSTRAINT IF EXISTS product_variants_compare_at_price_check;
ALTER TABLE product_variants
  ADD CONSTRAINT product_variants_compare_at_price_check
  CHECK (
    compare_at_price_paise IS NULL
    OR price_paise IS NULL
    OR compare_at_price_paise > price_paise
  );

-- 10. Enforce single admin user (safety net)
CREATE UNIQUE INDEX IF NOT EXISTS admin_users_single_row
  ON admin_users ((true));
