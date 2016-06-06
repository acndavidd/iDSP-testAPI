CREATE OR REPLACE FUNCTION public.get_retailer_summary(pRetailerId varchar)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);
BEGIN
	select row_to_json(tempSuccess) INTO _result
	from(
		select 'Success' status, '' "errorType",
		'' "errorCode", res.data "result" from 
			(
			select row_to_json(temp) "data" 
			from (
				select a.retailer_id retailer_id,a.retailer_name retailer_name,
				a.owner_first_name owner_name, a.retailer_min retailer_min,
				a.civil_status civil_status, a.email email,
				a.gender gender, a.birthday birthday,
				a.retailer_address retailer_address, 
				b.threshold_hit threshold_hit,
				coalesce(b.value_segment, '') value_segment,
				coalesce(SUM(c.AMOUNT), 0) total_ar
				from MST_RETAILER a 
				LEFT JOIN MST_RETAILER_DSP_ALERT b on a.RETAILER_ID = b.RETAILER_ID and DATE_TRUNC('day',date) = DATE_TRUNC('day',NOW())
				LEFT JOIN TRX_ACCOUNT_RECEIVABLE c on a.RETAILER_ID = c.RETAILER_ID and c.status != 'Paid'
				where a.retailer_id = pRetailerId
				and a.sync_status != 'D'
				group by a.retailer_id ,a.retailer_name, a.owner_first_name, a.retailer_min,
				a.civil_status, a.email, a.gender, a.birthday, 
				a.retailer_address, b.threshold_hit, b.value_segment
			)temp
		)res
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