CREATE OR REPLACE FUNCTION public.get_brands()
  RETURNS json AS
$BODY$
DECLARE
	_result VARCHAR(100000);	
BEGIN

select array_to_json(array_agg(row_to_json(temp))) INTO _result
from (
	select 	a.brand
		from mst_prod_cat a
		group by a.brand
		)temp;
		RETURN _result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_brands()
  OWNER TO postgres;
