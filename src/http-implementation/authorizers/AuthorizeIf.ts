import { Request } from 'express';

export type AuthorizeIf = (req: Request) => Promise<boolean>;
