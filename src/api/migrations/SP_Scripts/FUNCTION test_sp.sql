CREATE OR REPLACE FUNCTION test_sp(
	id VARCHAR,
	firstName VARCHAR
)
  RETURNS JSON AS
$BODY$
DECLARE
	_result VARCHAR;
BEGIN /* Test Comment */
	SELECT array_to_json(array_agg(mst_dsp)) INTO _result FROM mst_dsp WHERE first_name LIKE '%'||firstName||'%';
	RETURN _result;
END	
$BODY$
LANGUAGE plpgsql;