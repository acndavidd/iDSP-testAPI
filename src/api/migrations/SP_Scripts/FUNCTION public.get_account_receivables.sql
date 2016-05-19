CREATE OR REPLACE FUNCTION public.get_account_receivables(v_dsp_id varchar, v_date numeric)
RETURNS json AS
$BODY$
DECLARE
	v_result json;
	v_total_amount numeric;
BEGIN
	
	select array_to_json(array_agg(row_to_json(temp))) INTO v_result
	from (
		select a.order_Id,b.amount,b.dsp_id,c.retailer_name,c.retailer_min,c.retailer_id,e.route_day,e.sequence, 
			(select sum(amount) as v_total_amount from trx_account_receivable
				where dsp_id = v_dsp_id and retailer_id in(
				select retailer_id from mst_route where route_id in(
				select route_id from mst_route_day where route_day = v_date
				)
				)group by dsp_id)
			total_amount
		from (
		trx_sales_order a join
		trx_account_receivable b on a.order_id = b.order_id 
		and b.dsp_id = v_dsp_id left join
		mst_retailer c on b.retailer_id = c.retailer_id left join
		mst_route d on c.retailer_id = d.retailer_id join
		mst_route_day e on d.route_id = e.route_id and e.route_day = v_date)
		order by e.sequence asc nulls last		
	) temp;

	RETURN v_result;
END	
$BODY$
  LANGUAGE plpgsql;