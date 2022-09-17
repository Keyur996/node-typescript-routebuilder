import { Request, RequestHandler } from "express";
import { GetMethods, GetReqType, Methods, OtherReqTypes } from "./base.enum";


type GetType = {
    [key in GetReqType]?: {
        [key in GetMethods]?: {
            after?: RequestHandler,
            before?: RequestHandler
        } | {}
    } | {}
};

type OtherTypes = {
    [key in OtherReqTypes]?: {
        [key in Methods]?: {
            after?: RequestHandler,
            before?: RequestHandler
        } | {}
    } | {}
};

export interface IRequest extends Request{
    data?: any,
    status?: number,
}

export type ReqTypes = OtherTypes & GetType;