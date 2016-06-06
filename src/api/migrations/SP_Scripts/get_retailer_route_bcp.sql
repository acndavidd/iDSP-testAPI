CREATE OR REPLACE FUNCTION public.get_retailer_route_bcp(
    psalesperson character varying,
    pday integer)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);	
BEGIN

	select array_to_json(array_agg(row_to_json(temp))) INTO _result
	from (
		select a.retailer_id,a.retailer_name,a.retailer_min,a.retailer_type outlet_type,
		a.owner_first_name owner_name, a.retailer_address retailer_address, 
		c.sequence seq,
			(
				select sum(r.amount) from trx_account_receivable r
				where r.retailer_id = a.retailer_id 
			)total_acr,
			(
				select count(r.amount) from trx_account_receivable r
				where r.retailer_id = a.retailer_id
			)total_count,
			(
				SELECT CASE WHEN call_status IS NULL THEN 'Not Visited' ELSE call_status END AS call_status
				from trx_sales_call_plan s where s.route_id =c.route_id
			)call_status,
			(
				SELECT call_id
				from trx_sales_call_plan s where s.route_id =c.route_id
			)call_id
		from MST_RETAILER a, MST_ROUTE b, MST_ROUTE_DAY c
		where a.retailer_id = b.retailer_id
		and b.route_id::integer = c.route_id
		and c.route_day = pDay
		and a.dsp_id = pSalesPerson
	)temp;
	RETURN _result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_retailer_route_bcp(character varying, integer)
  OWNER TO postgres;
