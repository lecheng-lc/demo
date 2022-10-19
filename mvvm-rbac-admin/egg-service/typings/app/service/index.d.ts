// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdminUser from '../../../app/service/adminUser';
import ExportLogin from '../../../app/service/login';
import ExportPermission from '../../../app/service/permission';
import ExportRole from '../../../app/service/role';
import ExportRolePermission from '../../../app/service/rolePermission';
import ExportTools from '../../../app/service/tools';

declare module 'egg' {
  interface IService {
    adminUser: AutoInstanceType<typeof ExportAdminUser>;
    login: AutoInstanceType<typeof ExportLogin>;
    permission: AutoInstanceType<typeof ExportPermission>;
    role: AutoInstanceType<typeof ExportRole>;
    rolePermission: AutoInstanceType<typeof ExportRolePermission>;
    tools: AutoInstanceType<typeof ExportTools>;
  }
}
