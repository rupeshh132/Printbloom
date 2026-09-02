-- 1. Create a sequence for the invoice number
CREATE SEQUENCE IF NOT EXISTS order_invoice_seq START 1;

-- 2. Add columns to orders table
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS invoice_no TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0.00;

-- 3. Create a function to generate the invoice number
CREATE OR REPLACE FUNCTION generate_invoice_no()
RETURNS TRIGGER AS $$
DECLARE
    current_year TEXT;
    seq_val INT;
BEGIN
    current_year := to_char(CURRENT_DATE, 'YYYY');
    
    -- We'll use a continuous sequence padded to 4 digits.
    seq_val := nextval('order_invoice_seq');
    
    NEW.invoice_no := 'PB-' || current_year || '-' || LPAD(seq_val::TEXT, 4, '0');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Create trigger
DROP TRIGGER IF EXISTS trg_generate_invoice_no ON public.orders;
CREATE TRIGGER trg_generate_invoice_no
BEFORE INSERT ON public.orders
FOR EACH ROW
WHEN (NEW.invoice_no IS NULL)
EXECUTE FUNCTION generate_invoice_no();

-- 5. Update RLS policies to allow admin
-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can delete their own orders" ON public.orders;

-- Recreate policies with admin check
CREATE POLICY "Users and admins can view orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id OR auth.jwt()->>'email' = 'arhaan.s7045@gmail.com');

CREATE POLICY "Users can insert their own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update orders" 
ON public.orders FOR UPDATE 
USING (auth.jwt()->>'email' = 'arhaan.s7045@gmail.com');

CREATE POLICY "Admins can delete orders" 
ON public.orders FOR DELETE 
USING (auth.jwt()->>'email' = 'arhaan.s7045@gmail.com');
