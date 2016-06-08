-- Function: public.get_bcp_dropsize(character varying, numeric, character varying, character varying)

-- DROP FUNCTION public.get_bcp_dropsize(character varying, numeric, character varying, character varying);

CREATE OR REPLACE FUNCTION public.get_bcp_dropsize(
    v_brand character varying,
    v_month numeric,
    v_retailer_id character varying,
    v_subcat_type character varying)
  RETURNS json AS
$BODY$
DECLARE
	dropsize numeric;
	v_target numeric;
	v_percent_share numeric;
	v_month_to_date numeric;
	v_total_visit numeric;
	v_visited numeric;
	result json;
	
BEGIN

	select a.target_month::numeric x, e.percent_share::numeric into  v_target,v_percent_share from
	mst_target a, mst_product b, mst_prod_sub_cat c, mst_prod_cat d, mst_prod_percent_share e
	where a.sub_category_id = b.sub_category_id
	and b.sub_category_id = c.sub_category_id
	and b.sub_category_id = e.sub_category_id
	and c.category_id = d.category_id
	and c.sub_category_type = v_subcat_type
	and upper(d.brand) = upper(v_brand)
	and e.retailer_id = v_retailer_id;

	select sum(a.net_amount)::numeric into v_month_to_date
	from trx_sales_order a
	where a.retailer_id = v_retailer_id
	and to_char(order_date,'MM')::numeric = v_month;

	select frequency::numeric into v_total_visit from MST_FREQ_MAPPING a, MST_ROUTE b
	where a.freq_map_id = b.freq_map_id
	and b.retailer_id = v_retailer_id;

	select count(a.call_id)::numeric into v_visited from trx_sales_call_plan a, mst_route b
	where a.route_id = b.route_id
	and b.retailer_id = v_retailer_id
	and a.call_status = 'Visited'
	and a.is_additional_route = 0;

	dropsize = ceil((v_target * v_percent_share - v_month_to_date) / (v_total_visit - v_visited));
	
	select json_build_object('status',0,'result', dropsize) into result;

	RETURN result;
	
END	
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.get_bcp_dropsize(character varying, numeric, character varying, character varying)
  OWNER TO postgres;
