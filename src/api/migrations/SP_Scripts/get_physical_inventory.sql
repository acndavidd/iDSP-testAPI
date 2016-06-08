CREATE OR REPLACE FUNCTION public.get_physical_inventory(
    psalesperson character varying,
    pretailerid character varying)
  RETURNS json AS
$BODY$
DECLARE
	vMonth INT;
	vYear INT;
	result VARCHAR(100000);	
	status INT; 
BEGIN


status = 0; 
	
	select json_build_object('status',status,'result',array_agg(row_to_json(temp))) INTO result
	from (
		select a.sub_category_id, a.sub_category_name,b.target_qty,
		(
			select array_to_json(array_agg(row_to_json(d)))
			from (
				select 
				c.product_id,
				c.product_name,
				(
					select quantity from trx_sales_order d
					left outer join trx_saleord_prd_det e
					on d.order_id = e.order_id 
					where d.dsp_id = psalesperson 
					and d.retailer_id = pretailerid
					and e.product_id = c.product_id
					order by order_date desc
					LIMIT 1
				) as last_quantity_sold,
				(
					select to_char(d.order_date,'dd/mm/yyyy') as order_date from trx_sales_order d
					left outer join trx_saleord_prd_det e
					on d.order_id = e.order_id 
					where d.dsp_id = psalesperson 
					and d.retailer_id = pretailerid
					and e.product_id = c.product_id
					and a.sub_category_id = b.sub_category_id
					order by order_date desc
					LIMIT 1
				) as last_transaction
				from mst_product c
				where a.sub_category_id = c.sub_category_id
				
			) d
		) as product
		from mst_prod_sub_cat a join mst_target b
		on  a.sub_category_id = b.sub_category_id
		where 
		extract(month from NOW()) = b.target_month
		and extract(year from NOW()) = b.target_year
	)temp;
	RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_physical_inventory(character varying, character varying)
  OWNER TO postgres;
