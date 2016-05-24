CREATE OR REPLACE FUNCTION public.generate_call_plan()
RETURNS json AS
$BODY$
DECLARE
	v_call_id varchar;
	v_time_stamp numeric(20,0);
	v_call_status varchar;
	v_call_date date;
	v_total_row integer;
	v_affected integer;
	each_route record;

	
BEGIN
	v_total_row = 0;
	--Initial Data Of The Day
	v_call_status = 'Not Visited';
	select date_trunc('day',NOW()) into v_call_date;

	select to_char(localtimestamp,c.value) into v_time_stamp
	FROM MST_CONFIG C
	where c.name = 'TIMESTAMP_FORMAT' and c.sync_status != 'D';
	
	FOR each_route IN
		select A.ROUTE_ID, B.ROUTE_DAY, B.SEQUENCE
		FROM MST_ROUTE A, MST_ROUTE_DAY B
		WHERE A.ROUTE_ID = B.ROUTE_ID
		and A.SYNC_STATUS != 'D'
		and B.SYNC_STATUS != 'D'		
		and B.ROUTE_DAY = date_part('dow', NOW())
		and B.sequence is not null
		order by a.DSP_ID, b.SEQUENCE asc
	LOOP
		v_time_stamp = v_time_stamp + 1;
	
		select a.value||b.value||v_time_stamp
		into v_call_id 
		from mst_config a, mst_config b
		where a.name = 'TRANS_PREFIX' and a.sync_status != 'D'
		and b.name = 'TRX_SALES_CALL_PLAN_PREFIX' and b.sync_status != 'D';
		
		INSERT INTO TRX_SALES_CALL_PLAN (CALL_ID, ROUTE_ID, ROUTE_DAY, CALL_SEQUENCE, CALL_DATE, CALL_STATUS) 
		VALUES (v_call_id , each_route.ROUTE_ID, each_route.ROUTE_DAY, each_route.SEQUENCE, v_call_date, v_call_status);

		GET DIAGNOSTICS v_affected = ROW_COUNT;
		v_total_row = v_total_row + v_affected;
	END LOOP;
	
	return v_total_row;
END       
$BODY$
  LANGUAGE plpgsql VOLATILE;