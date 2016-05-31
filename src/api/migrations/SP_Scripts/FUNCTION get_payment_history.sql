CREATE OR REPLACE FUNCTION public.get_payment_history(
    pretailerid character varying,
    pintervalday integer)
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);	
BEGIN

select array_to_json(array_agg(row_to_json(temp))) INTO _result
from (
	select 	a.coll_id coll_id,
		a.amount,
		to_char(a.trans_date,'dd/mm/yyyy') trans_date,
		a.retailer_id
			from trx_collection a
			where retailer_id = pRetailerId
			and a.trans_date::date between DATE_TRUNC('day',NOW())::date-pIntervalDay  and DATE_TRUNC('day',NOW())::date 
		)temp;
		RETURN _result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_payment_history(character varying, integer)
  OWNER TO postgres;
