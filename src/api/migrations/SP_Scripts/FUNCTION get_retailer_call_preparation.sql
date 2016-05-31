CREATE OR REPLACE FUNCTION public.get_retailer_call_prep(
    psalesperson character varying,
    pretailerid character varying)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);	
BEGIN

select array_to_json(array_agg(row_to_json(temp))) INTO _result
from (
select 	a.retailer_id retailer_id,
	a.retailer_name retailer_name,
	a.retailer_type outlet_type,
	substring(a.retailer_name from 1 for 1) first_char,
	a.owner_first_name owner_name,
	a.civil_status civil_status, 
	a.email email,
	a.gender gender, 
	to_char(a.birthday,'dd/mm/yyyy') birthday,
	a.retailer_min retailer_min,
	coalesce(SUM(c.AMOUNT), 0) total_ar,
	coalesce(b.value_segment, '') value_segment,
	coalesce(b.threshold_hit , 0) threshold_hit,
	a.retailer_address retailer_address,
	x.call_status call_status,
	x.call_id call_id,
	x.call_sequence seq,
	to_char(x.end_Coll_Date,'dd/mm/yyyy') last_visit,(
		select array_to_json(array_agg(row_to_json(e)))from
		(
			select to_char(cl.Trans_Date,'dd/mm/yyyy') trans_date from TRX_COLLECTION cl, MST_RETAILER a
			where a.retailer_id=cl.retailer_id
		)e)coll_date,(
		select array_to_json(array_agg(row_to_json(d)))
		from
		(
			select cl.amount from TRX_COLLECTION cl, MST_RETAILER a
			where a.retailer_id=cl.retailer_id
		)d)coll_amount
	from MST_RETAILER a 
	LEFT JOIN MST_RETAILER_DSP_ALERT b on a.RETAILER_ID = b.RETAILER_ID and DATE_TRUNC('day',date) = DATE_TRUNC('day',NOW())
	LEFT JOIN TRX_ACCOUNT_RECEIVABLE c on a.RETAILER_ID = c.RETAILER_ID and c.status != 'Paid'
	LEFT JOIN MST_ROUTE r on a.retailer_id = r.retailer_id 
	LEFT JOIN TRX_SALES_CALL_PLAN x on r.route_id = x.route_id
	where a.retailer_id = pRetailerID
	and a.dsp_id = pSalesPerson
	and x.call_date::date =  DATE_TRUNC('day',NOW())::date
	group by a.retailer_id ,a.retailer_name, a.owner_first_name, a.retailer_min,
	a.civil_status, a.email, a.gender, a.birthday, x.call_id,
	a.retailer_address,b.threshold_hit, b.value_segment, x.call_status, x.end_coll_date
	)temp;
	RETURN _result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_retailer_call_prep(character varying, character varying)
  OWNER TO postgres;
