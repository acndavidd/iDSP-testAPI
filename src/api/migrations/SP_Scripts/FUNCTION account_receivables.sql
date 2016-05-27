-- Function: public.account_receivables(character varying, character varying, numeric)

-- DROP FUNCTION public.account_receivables(character varying, character varying, numeric);

CREATE OR REPLACE FUNCTION public.account_receivables(
    v_dsp_id character varying,
    v_source character varying,
    v_date numeric)
  RETURNS json AS
$BODY$
DECLARE
	v_result json;
	v_receivables json;
	v_receivables_all json;
	v_total_amount numeric;
BEGIN
	
	select array_to_json(array_agg(row_to_json(temp1))) into v_receivables
	from (
		select to_char(b.amount, '999,999,999,990D00 FM₱') amount,b.dsp_id,c.retailer_name,c.retailer_min,c.retailer_id,e.route_day,e.sequence,(case when lower(v_source) = 'idsp' THEN 'BCP' ELSE v_source END) as source,
			(select to_char(sum(amount), '999,999,999,990D00 FM₱') from trx_account_receivable tr
				where tr.dsp_id = v_dsp_id and retailer_id in(
				select retailer_id from mst_route mr where mr.route_id in(
				select route_id from mst_route_day mrd where mrd.route_day = v_date
				and mrd.sequence is not null
				)
				)group by dsp_id)
			ret_total_amount
		from (
		trx_account_receivable b join
		mst_retailer c on b.retailer_id = c.retailer_id and b.dsp_id = v_dsp_id join
		mst_route d on c.retailer_id = d.retailer_id join
		mst_route_day e on d.route_id = e.route_id and e.route_day = v_date
		and e.sequence is not null)
		order by e.sequence asc nulls last		
	) temp1;

	select array_to_json(array_agg(row_to_json(temp2))) INTO v_receivables_all
	from (
		select to_char(b.amount, '999,999,999,990D00 FM₱') amount,b.dsp_id,c.retailer_name,c.retailer_min,c.retailer_id,e.route_day,e.sequence,(case when lower(v_source) = 'idsp' THEN 'BCP' ELSE v_source END) as source,
			(select to_char(sum(amount), '999,999,999,990D00 FM₱') from trx_account_receivable f join mst_retailer g
			on f.retailer_id = g.retailer_id and f.dsp_id = v_dsp_id left join
			mst_route h on g.retailer_id = h.retailer_id join
			mst_route_day i on h.route_id = i.route_id
			and i.route_day = v_date
			group by f.dsp_id) total_amount
		from (
		trx_account_receivable b join
		mst_retailer c on b.retailer_id = c.retailer_id and b.dsp_id = v_dsp_id left join
		mst_route d on c.retailer_id = d.retailer_id join
		mst_route_day e on d.route_id = e.route_id and e.route_day = v_date)
		order by e.sequence asc nulls last		
	) temp2;

	select array_to_json(array_agg(row_to_json(tempAll))) into v_result
	from(
		select v_receivables, v_receivables_all
	) tempAll;

	return v_result;
END	
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.account_receivables(character varying, character varying, numeric)
  OWNER TO postgres;
