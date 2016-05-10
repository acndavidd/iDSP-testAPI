var public.role = Sequelize.define("public.role",
{ roleId: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'INTEGER',
        types: [Object] },
     field: 'roleId',
     primaryKey: true,
     allowNull: false,
     unique: 'Role_pkey' },
  roleName: 
   { type: { options: [Object], _binary: undefined, _length: 200 },
     field: 'roleName' } },
{ tableName: 'Role', schema: 'public', timestamps: false });


var public.user = Sequelize.define("public.user",
{ userID: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'INTEGER',
        types: [Object] },
     field: 'userID',
     primaryKey: true,
     allowNull: false,
     unique: 'User_pkey' },
  password: 
   { type: { options: [Object], _binary: undefined, _length: 200 },
     field: 'password' },
  roleId: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'INTEGER',
        types: [Object] },
     field: 'roleId',
     references: 'public.role',
     referencesKey: 'roleId' },
  created: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'TIME',
        types: [Object] },
     field: 'created' },
  createdBy: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'INTEGER',
        types: [Object] },
     field: 'createdBy',
     references: 'public.user',
     referencesKey: 'createdBy' },
  updated: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'DATE',
        types: [Object] },
     field: 'updated' },
  updatedBy: 
   { type: 
      { [Function]
        super_: [Object],
        warn: [Function],
        inherits: [Function],
        key: 'INTEGER',
        types: [Object] },
     field: 'updatedBy',
     references: 'public.user',
     referencesKey: 'updatedBy' },
  status: 
   { type: { options: [Object], _binary: undefined, _length: 1 },
     field: 'status' } },
{ tableName: 'User', schema: 'public', timestamps: false });


public.role.hasMany(public.user, { as: 'userRoleIdFkeys',
  foreignKey: 'roleId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.role.belongsToMany(public.user, { as: 'relatedUserRoleIdFkeyCreatedBies',
  foreignKey: 'roleId',
  otherKey: 'createdBy',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.role.belongsToMany(public.user, { as: 'relatedUserRoleIdFkeyUpdatedBies',
  foreignKey: 'roleId',
  otherKey: 'updatedBy',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.hasMany(public.user, { as: 'createdByFkeys',
  foreignKey: 'createdBy',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.hasMany(public.user, { as: 'updatedByFkeys',
  foreignKey: 'updatedBy',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsTo(public.user, { as: 'relatedCreatedBy',
  foreignKey: 'createdBy',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsTo(public.role, { as: 'relatedRoleId',
  foreignKey: 'roleId',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsTo(public.user, { as: 'relatedUpdatedBy',
  foreignKey: 'updatedBy',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsToMany(public.role, { as: 'relatedCreatedByFkeyRoleIds',
  foreignKey: 'createdBy',
  otherKey: 'roleId',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsToMany(public.user, { as: 'relatedCreatedByFkeyUpdatedBies',
  foreignKey: 'createdBy',
  otherKey: 'updatedBy',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsToMany(public.user, { as: 'relatedUpdatedByFkeyCreatedBies',
  foreignKey: 'updatedBy',
  otherKey: 'createdBy',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

public.user.belongsToMany(public.role, { as: 'relatedUpdatedByFkeyRoleIds',
  foreignKey: 'updatedBy',
  otherKey: 'roleId',
  through: 'User',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION' });

