CREATE OR REPLACE FUNCTION get_retailer_alert(
	p_dsp_id VARCHAR
)
RETURNS JSON AS
$BODY$
DECLARE
	_result VARCHAR;
BEGIN
	SELECT ARRAY_TO_JSON(ARRAY_AGG(ROW_TO_JSON(temp))) INTO _result
	FROM(
		SELECT 
			retailer.retailer_name,
			retailer.retailer_min,
			alert.value_segment,
			alert.threshold_hit,
			route.sequence
		FROM mst_retailer retailer
		JOIN mst_retailer_dsp_alert alert
		ON retailer.retailer_id = alert.retailer_id
		AND date_trunc('day',date) = date_trunc('day',NOW()) 
		LEFT OUTER JOIN (
			SELECT route.retailer_id,route_day.sequence
			FROM mst_route route
			JOIN mst_route_day route_day
			ON route.route_id = route_day.route_id
		) route 
		ON route.retailer_id = retailer.retailer_id
		WHERE retailer.dsp_id = p_dsp_id
	)AS temp;
	RETURN _result;
END
$BODY$
LANGUAGE plpgsql;