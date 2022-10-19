// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminUser from '../../../app/model/adminUser';
import ExportPermission from '../../../app/model/permission';
import ExportRole from '../../../app/model/role';
import ExportRolePermission from '../../../app/model/rolePermission';

declare module 'egg' {
  interface IModel {
    AdminUser: ReturnType<typeof ExportAdminUser>;
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    RolePermission: ReturnType<typeof ExportRolePermission>;
  }
}
