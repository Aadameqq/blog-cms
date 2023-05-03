import 'express-session-wrapper';

type ExpressSessionAccount = {
  id: string;
  permissions: string[];
};

export declare module 'express-session-wrapper' {
  interface SessionWrapperData {
    account: ExpressSessionAccount;
  }
}
export declare module 'express-serve-static-core' {
  interface Request {
    optionalAccount?: ExpressSessionAccount;
    account: ExpressSessionAccount;
  }
}
