CREATE OR REPLACE FUNCTION migrate_SP(
	p_func_name VARCHAR
)
RETURNS VOID AS
$BODY$
DECLARE
	v_query VARCHAR;
	v_params RECORD;
BEGIN
	FOR v_params IN
		SELECT pg_catalog.pg_get_function_identity_arguments(p.oid) AS params FROM pg_catalog.pg_proc p
		JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
		WHERE p.proname = p_func_name
	LOOP
		v_query = CONCAT('DROP ' , p_func_name , '(', v_params.params, ')');
		EXECUTE v_query;
	END LOOP;
END
$BODY$
LANGUAGE plpgsql;