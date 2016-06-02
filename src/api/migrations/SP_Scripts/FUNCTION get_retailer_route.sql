CREATE OR REPLACE FUNCTION public.get_retailer_route(pSelectedDay int, pSales varchar)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);
	_data JSON;
BEGIN
	select array_to_json(array_agg(row_to_json(temp))) INTO _data
	from (
		select a.retailer_id retailer_id,a.retailer_name retailer_name,
		a.owner_first_name owner_name, a.retailer_address retailer_address,
		c.sequence seq
		from MST_RETAILER a, MST_ROUTE b, MST_ROUTE_DAY c
		where a.retailer_id = b.retailer_id
		and b.route_id = c.route_id
		and c.route_day = pSelectedDay
		and a.dsp_id = pSales
		and c.sequence is not null
		and a.sync_status != 'D'
		and b.sync_status != 'D'
		and c.sync_status != 'D'
		order by c.sequence DESC NULLS LAST
	)temp;

	select row_to_json(tempSuccess) INTO _result
	from(
		select 'Success' status, '' "errorType",
		'' "errorCode", _data "result"
	)tempSuccess;
	
	RETURN _result;
	
exception when others then 

	select row_to_json(tempErr) INTO _result
	from(
		select 'Error' status, 'Database Exception' "errorType",
		SQLSTATE || SQLERRM "errorCode", null "result"
	)tempErr;
	
	RETURN _result;
END
$BODY$
  LANGUAGE plpgsql;
