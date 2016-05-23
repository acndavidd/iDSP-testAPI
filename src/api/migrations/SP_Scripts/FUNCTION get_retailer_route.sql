CREATE OR REPLACE FUNCTION public.get_retailer_route(pSelectedDay int, pSales varchar)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);
BEGIN
	select array_to_json(array_agg(row_to_json(temp))) INTO _result
	from (
		select a.retailer_id retailer_id,a.retailer_name retailer_name,
		a.owner_first_name owner_name, a.retailer_address retailer_address,
		c.sequence seq
		from MST_RETAILER a, MST_ROUTE b, MST_ROUTE_DAY c
		where a.retailer_id = b.retailer_id
		and b.route_id = c.route_id
		and c.route_day = pSelectedDay
		and a.dsp_id = pSales
		order by c.sequence DESC NULLS LAST
	)temp;
	RETURN _result;
END	
$BODY$
  LANGUAGE plpgsql;