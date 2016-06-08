CREATE OR REPLACE FUNCTION public.account_receivables_self(v_data_self json)
  RETURNS json AS
$BODY$
	DECLARE
		v_result varchar[];
		result json;
		bb json;
		v_total_amount numeric;
		status numeric;
		error_code numeric;
		i json;
		aa json;
		count numeric;
		v_amount numeric;
	BEGIN
		--INITIATE DEFAULT RESPONSE
		status = 0;
		error_code = 0;
		count = 0;

		--CREATE TEMP TABLE
		CREATE TABLE json_tmp (
		id serial,
		v_receivables_self json,
		amount numeric,
		sequence numeric
		);

		FOR i in SELECT * FROM json_array_elements(v_data_self)
		LOOP
		
		select to_json(k) into aa FROM(
			select (i->>'self_amount')::numeric as amount, i->>'retailer_name' as retailer_name, i->>'retailer_min' as retailer_min,
			i->>'retailer_id' as retailer_id, b.sequence, i->>'source' as source
			FROM MST_ROUTE a JOIN MST_ROUTE_DAY b
			ON a.route_id = b.route_id
			and a.retailer_id = i->>'retailer_id'
			and b.route_day = (i->>'routeday')::numeric
			) k
		;
		INSERT INTO json_tmp values(count,aa,(aa->>'amount')::numeric, (aa->>'sequence')::numeric);

		count = count+1;
			
		END LOOP;

			
		select array_to_json(array_agg(row_to_json(temp2))) INTO bb from (
			select v_receivables_self,(select sum(amount) from json_tmp where v_receivables_self is not null) as self_total_amount,
			(select sum(amount) from json_tmp where v_receivables_self is not null and sequence is not null) as self_route_amount from json_tmp
			where v_receivables_self is not null
		)temp2;

		select json_build_object('status',status,'result', bb ) into result;

		DROP table json_tmp;

		RETURN result;
		
	END	
	$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.account_receivables_self(json)
  OWNER TO postgres;
