// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportErrorHandle from '../../../app/middleware/error_handle';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    errorHandle: typeof ExportErrorHandle;
  }
}
