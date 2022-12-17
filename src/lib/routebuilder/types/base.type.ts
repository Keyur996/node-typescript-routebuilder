import { Request, RequestHandler } from 'express';
import { Methods, ReqTypes } from './../constants/base.constant';

type GetType = {
  [key in Extract<ReqTypes, 'GET'>]?:
    | {
        [key in Exclude<Methods, 'ONESOFT'>]?:
          | {
              after?: RequestHandler;
              before?: RequestHandler;
            }
          | {};
      }
    | {};
};

type OtherTypes = {
  [key in Exclude<ReqTypes, 'GET'>]?:
    | {
        [key in Exclude<Methods, 'ALL'>]?:
          | {
              after?: RequestHandler;
              before?: RequestHandler;
            }
          | {};
      }
    | {};
};

export interface IRequest extends Request {
  data?: any;
  status?: number;
}

export type ReqTypesObj = OtherTypes & GetType;
