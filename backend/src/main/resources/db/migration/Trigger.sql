CREATE SEQUENCE product_seq START 1;
create
or replace function generate_product_id()
    returns Trigger as
$$
BEGIN
    new.id
:= 'product' || LPAD(NEW.serial_number::TEXT, 5, '0');
RETURN NEW;
end;
$$
language plpgsql;
create Trigger product_id_trigger
    Before insert
    on products
    FOR EACH ROW
    EXECUTE FUNCTION generate_product_id();