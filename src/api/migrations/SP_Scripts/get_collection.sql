CREATE OR REPLACE FUNCTION public.get_collection(
    psalesperson character varying,
    pretailerid character varying)
  RETURNS json AS
$BODY$
DECLARE
	result VARCHAR(100000);
	status INT; 	
BEGIN
status = 0;
select json_build_object('status',status,'result',array_to_json(array_agg(temp))) INTO result
from (
	select 
	coll_id,
	amount,
	to_char(trans_date,'yyyy/mm/dd') trans_date
	from trx_collection
	where 
	dsp_id = psalesperson
	and retailer_id = pretailerid
	order by trans_date desc
	limit 3
)temp;
RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_collection(character varying, character varying)
  OWNER TO postgres;
