CREATE OR REPLACE FUNCTION test_sp(
	id VARCHAR,
	firstName VARCHAR
)
  RETURNS JSON AS
$BODY$
DECLARE
	_result VARCHAR;
BEGIN /* Test Comment */
	SELECT json_build_object('status', 0 , 'result' , 'hihihihi') INTO _result;
	RETURN _result;
END	
$BODY$
LANGUAGE plpgsql;