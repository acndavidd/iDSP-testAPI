CREATE OR REPLACE FUNCTION public.get_outstanding_balance(
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
		select retailer_id , sum(amount) amount from TRX_ACCOUNT_RECEIVABLE
		where dsp_id = psalesperson
		and retailer_id = pretailerid
		group by retailer_id
	)temp;
	RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_outstanding_balance(character varying, character varying)
  OWNER TO postgres;
