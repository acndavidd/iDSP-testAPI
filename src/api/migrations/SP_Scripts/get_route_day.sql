CREATE OR REPLACE FUNCTION public.get_route_day(vretailerids json)
  RETURNS json AS
$BODY$
DECLARE
	result VARCHAR(100000);
	vdow INT;
	i json;
	vartemp1 json;
	status INT; 	
BEGIN

create table retailer_temp(retailerid json);
select extract(dow from  current_date) into vdow;

for i in select * from json_array_elements(vretailerids)
loop
	RAISE INFO 'Get Retailer ID: %', i->>'retailerid';
	select to_json(temp1) into vartemp1 from(
		select a.route_id route_id,
		a.dsp_id dsp_id,
		a.freq_map_id freq_map_id,
		b.sequence sequence_no,
		a.retailer_id retailer_id,
		i ->>'store_name' as store_name,
		i ->>'outlet_type'as outlet_type,
		i ->>'retailer_min' as retailer_min,
		i ->>'retailer_address' as retailer_address,
		i ->>'number_of_self_transaction' as number_of_self_transaction,
		i ->>'number_of_aging_self_transaction' as number_of_aging_self_transaction,
		i ->>'total_amount_self_transaction' as total_amount_self_transaction,
		i ->>'dsp_name' as dsp_name,
		c.call_id call_id,
		CASE WHEN call_status IS NULL THEN 'Not Visited' ELSE call_status END AS call_status
		from mst_route a
		join mst_route_day b on a.route_id = b.route_id
		join trx_sales_call_plan c on a.route_id = c.route_id
		where 
		b.route_day = vdow and
		a.retailer_id = i->>'retailerid'
		order by sequence_no asc
		) temp1;

	insert into retailer_temp values(vartemp1);

end loop;
status = 0;
select json_build_object('status',status,'result',array_to_json(array_agg(row_to_json(temp2))))into result from (
select retailerid as getroute from retailer_temp 
where retailerid is not null
)temp2;

drop table retailer_temp;
RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_route_day(json)
  OWNER TO postgres;
