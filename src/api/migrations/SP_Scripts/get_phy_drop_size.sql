CREATE OR REPLACE FUNCTION public.get_phy_drop_size(
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
				select 		p.sub_category_id, 
						p.sub_category_name,
						p.ttarget,
						percent_share,
						supposed_remaining_visits,
						sales_retailer,
						ceil((((p.ttarget*percent_share/100)-sales_retailer)/supposed_remaining_visits)) dropsize,
						(select array_to_json(array_agg(row_to_json(x)))
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
								order by order_date desc
								LIMIT 1
							) as last_transaction
							from mst_product c
							where p.sub_category_id = c.sub_category_id
						)x)	as product
						
				from (
					select a.sub_category_id,a.sub_category_name,
					(						
						select percent_share::float
						from mst_prod_percent_share c
						where c.retailer_id = pretailerid
						and c.sub_category_id = a.sub_category_id
						
					) percent_share,
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
					)supposed_remaining_visits,
					(
						select 
						coalesce(sum(e.quantity),0)::float
						from trx_sales_order d
						join trx_saleord_prd_det e
						on d.order_id = e.order_id
						join mst_product f
						on e.product_id = f.product_id
						where d.dsp_id = psalesperson
						and d.retailer_id = pretailerid
						and extract(month from NOW()) = extract(month from d.order_date)
						and extract(year from NOW()) = extract(year from d.order_date)
						and f.sub_category_id = a.sub_category_id
					)sales_retailer,
					(
						SELECT 
						ceil(cast(SUM(tgt.target_qty)as float))tgt_qty 
						FROM mst_target tgt
						WHERE tgt.DSP_ID = pSalesPerson				
						and extract(month from NOW()) = tgt.target_month
						and extract(year from NOW()) = tgt.target_year
						and tgt.sub_category_id = a.sub_category_id
					)tTarget
					from mst_prod_sub_cat a 
					where 
					a.sub_cat_type in ('P')
				)p			
	)temp;
	RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_phy_drop_size(character varying, character varying)
  OWNER TO postgres;
