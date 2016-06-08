CREATE OR REPLACE FUNCTION public.get_drop_size(
    psalesperson character varying,
    pretailerid character varying)
  RETURNS json AS
$BODY$
DECLARE
	result VARCHAR(100000);	
	status INT; 
BEGIN


status = 0; 
	
	select json_build_object('status',status,'result',array_agg(row_to_json(temp))) INTO result
	from (
		select x.brand,a.sub_category_id, a.sub_category_name,b.target_qty::float,
		(
			select array_to_json(array_agg(row_to_json(d))) 
			from (
				select
				(
					select percent_share::float
					from mst_prod_percent_share c
					where c.retailer_id = pretailerid
					and c.sub_category_id = b.sub_category_id
				 )as percent_share,
				 (
					select 
					(g.frequency::float - count(h.call_id)::float) percent_share
					from mst_route f
					join mst_freq_mapping g
					on f.freq_map_id = g.freq_map_id
					join trx_sales_call_plan h
					on f.route_id = h.route_id
					and f.dsp_id = psalesperson
					and f.retailer_id = pretailerid
					and h.call_status = 'Visited'
					group by g.frequency
				 )as supposed_remaining_visits,
				 (
					select 
					coalesce(sum(e.amount),0)::float
					from trx_sales_order d
					join trx_saleord_load_det e
					on d.order_id = e.order_id
					where d.dsp_id = psalesperson
					and d.retailer_id = pretailerid
					and extract(month from NOW()) = extract(month from d.order_date)
					and extract(year from NOW()) = extract(year from d.order_date)
					and e.product_id = b.sub_category_id
					group by e.product_id

				 )as sales_retailer
			) d
		) as product
		from mst_prod_sub_cat a join mst_target b
		on  a.sub_category_id = b.sub_category_id
		join mst_prod_cat x
		on a.category_id = x.category_id
		where 
		extract(month from NOW()) = b.target_month
		and extract(year from NOW()) = b.target_year
		and b.dsp_id = psalesperson
		and a.sub_category_id in ('PSCAT01','PSCAT10')
	)temp;
	RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_drop_size(character varying, character varying)
  OWNER TO postgres;