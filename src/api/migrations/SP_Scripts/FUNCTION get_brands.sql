CREATE OR REPLACE FUNCTION public.get_brands()
  RETURNS json AS
$BODY$
DECLARE
	result VARCHAR(100000);
	status INT; 	
BEGIN
status = 0;
select json_build_object('status',status,'result',array_to_json(array_agg(temp))) INTO result
from (
	select 	a.brand
	from mst_prod_cat a
	group by a.brand
)temp;
RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_brands()
  OWNER TO postgres;
