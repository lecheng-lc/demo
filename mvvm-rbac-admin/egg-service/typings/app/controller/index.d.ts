// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminAdminUser from '../../../app/controller/admin/adminUser';
import ExportAdminLogin from '../../../app/controller/admin/login';
import ExportAdminPermission from '../../../app/controller/admin/permission';
import ExportAdminRole from '../../../app/controller/admin/role';
import ExportAdminRolePermission from '../../../app/controller/admin/rolePermission';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      adminUser: ExportAdminAdminUser;
      login: ExportAdminLogin;
      permission: ExportAdminPermission;
      role: ExportAdminRole;
      rolePermission: ExportAdminRolePermission;
    }
  }
}
