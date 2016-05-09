"use strict";

module.exports = function(pSequelize,pDataTypes){
    var Role  = pSequelize.define("Role",{
        roleId   : { type     : pDataTypes.STRING },
        roleName : { type     : pDataTypes.STRING },
    },
    {
        timestamps : true,
        tableName  : 'Role'
    });
    return Role;
};