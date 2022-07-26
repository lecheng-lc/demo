'use strict';
import moment from 'moment'
module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const Role = app.model.define(
    'role',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING,
      },
      description: {
        type: STRING,
      },
      status: {
        type: INTEGER,
      },
      createdAt: {
        type: DATE,
        get() {
          return moment((this as any).getDataValue('createdAt')).format(
            'YYYY-MM-DD'
          );
        },
      },
      updatedAt: {
        type: DATE,
        get() {
          return moment((this as any).getDataValue('createdAt')).format(
            'YYYY-MM-DD'
          );
        },
      },
    },
    {
      freezeTableName: true, // 使用数据库里的真实表名
      underscored: false, // 不使用下划线
    }
  );
  Role.associate = function() {
    app.model.Role.hasMany(app.model.AdminUser, { as: 'adminUser' });
  };
  return Role;
};
