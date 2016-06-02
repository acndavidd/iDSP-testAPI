CREATE OR REPLACE FUNCTION public.get_target_actuals(
    psalesperson character varying,
    ptargettype character varying,
    pbrand character varying)
  RETURNS json AS
$BODY$
DECLARE
	vStartDate date;
	vEndDate date;
	vDivider integer;
	vLastDateinMonth date;
	vFirstDateinMonth date;
	vFirstDateinWeek date;
	vLastDateinWeek date;
	vDaysinMonth integer;
	vCurrentDate date;
	result VARCHAR(100000);	
	status INT; 
BEGIN

	select (date_trunc('MONTH', now()) + INTERVAL '1 MONTH - 1 day')::date into vLastDateinMonth ;
	select date_trunc('month', current_date)::date into vFirstDateinMonth;
	select date_trunc('week', current_date)::date into vFirstDateinWeek;
	select (current_date + (6 - extract(dow from current_date)) *'1 day'::interval)::date into vLastDateinWeek;
	select  DATE_PART('days',  DATE_TRUNC('month', NOW())  + '1 MONTH'::INTERVAL - '1 DAY'::INTERVAL) into vDaysinMonth;
	SELECT  DATE_TRUNC('day',NOW())::date into vCurrentDate;
	
	if (pTargetType = 'Day' )then
		vStartDate = vCurrentDate;
		vEndDate = vCurrentDate;
		vDivider = vDaysinMonth;
	elseif (pTargetType = 'Week' )then
		vStartDate = vFirstDateinWeek;
		vEndDate = vLastDateinWeek;
		vDivider = 4;
	elseif (pTargetType = 'Month' )then
		vStartDate = vFirstDateinMonth;
		vEndDate = vLastDateinMonth;
		vDivider = 1;
	end if;

	if(psalesperson is null or psalesperson = '')
	then
		SELECT json_build_object('status',status,'error_code',400) INTO result;
		RETURN result; 
	end if;

	if(ptargettype is null or ptargettype = '')
	then
		SELECT json_build_object('status',status,'error_code',400) INTO result;
		RETURN result; 
	end if;

	if(pbrand is null or pbrand = '')
	then
		SELECT json_build_object('status',status,'error_code',400) INTO result;
		RETURN result; 
	end if;
	
	
	status = 0; 
	
	select json_build_object('status',status,'result',array_agg(row_to_json(temp))) INTO result
	from (
		select category_id, category_name,
		(
			select array_to_json(array_agg(row_to_json(d)))
			from (
				select 	p.sub_category_id, 
					p.sub_category_name,
					p.ttarget,
					(p.tLoad + p.tPrd) tactual,
					(p.ttarget - (p.tLoad + p.tPrd)) balance,
					--p.tPrd tactual,
				CASE 
					WHEN ttarget = 0 THEN 100
					ELSE 
						round(
							cast(
								(
									p.tLoad + p.tPrd
									--p.tPrd
								)/ttarget*100 as numeric):: numeric, 2) 
				END prc_actual,
				CASE 
					WHEN ttarget = 0 THEN 100
					ELSE 
						ceil(
							(
								p.tLoad + p.tPrd
								--p.tPrd
							)/ttarget*100) 
				END prc_round				  
				from (
					select a.*,
					(
						SELECT coalesce(SUM(x.amount),0) ttl_load 
						FROM trx_saleord_load_det x, trx_sales_order y
						WHERE x.order_id = y.order_id 
						and y.DSP_ID = pSalesPerson
						and y.order_date between vStartDate and	vEndDate
						and x.product_id in (
							select prd1.product_id from mst_product prd1
							where prd1.sub_category_id = a.sub_category_id
						) 
					)tLoad,
					(
						SELECT coalesce(SUM(h.quantity),0) ttl_prd 
						FROM trx_saleord_prd_det h, trx_sales_order i
						WHERE h.order_id = i.order_id 
						and i.DSP_ID = pSalesPerson				
						and i.order_date between vStartDate and	vEndDate
						and h.product_id in (
							select prd2.product_id from mst_product prd2
							where prd2.sub_category_id = a.sub_category_id
						) 
					)tPrd,
					(
						SELECT 
						ceil(cast(SUM(tgt.target_qty)as float)/vDivider)tgt_qty 
						FROM mst_target tgt
						WHERE tgt.DSP_ID = pSalesPerson				
						and extract(month from NOW()) = tgt.target_month
						and extract(year from NOW()) = tgt.target_year
						and tgt.sub_category_id = a.sub_category_id
					)tTarget
					from mst_prod_sub_cat a				
					where category_id= mst_prod_cat.category_id
				)p			
			) d
		) as sub_cat
		from mst_prod_cat
		where brand = pBrand
	)temp;
	RETURN result;
END
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_target_actuals(character varying, character varying, character varying)
  OWNER TO postgres;
