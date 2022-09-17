import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { IRequest } from "./base.type";
import { ErrorResponse } from "./error";
import asyncHandler from 'express-async-handler'

export class Generator {
    model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    getOneRoute = asyncHandler(async (req: IRequest, _res: Response, next: NextFunction) => {
        const doc = await this.model.findById(req.params.id).lean();
        if(!doc) {
            next(new ErrorResponse('No Record Found', 404));
        }
        req.data = doc;
        next();
    });

    getAllRoute = asyncHandler(async (req: IRequest, _res: Response, next: NextFunction) => {
        const query: any = this.model.find(req.query ?? {});
        if(req.query?.select) {
            query.select(req.query?.select);
        }
        const docs = await query;
        if(!docs) {
            next(new ErrorResponse("No Document Found With given Id", 404));
        }
        req.data = docs;
        next();
    });

    updateOneRoute = asyncHandler(async (req: IRequest, _res: Response, next: NextFunction) => {
        const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
        if(!doc) {
            next(new ErrorResponse("No Document Found With given Id", 404));
        }
        req.data = doc;
        next();
    });

    deleteOneRoute = asyncHandler(async (req: IRequest, _res: Response, next: NextFunction) => {
        const doc = await this.model.findByIdAndDelete(req.params.id);

        if(!doc) {
            next(new ErrorResponse("No Document Found With given Id", 404));
        }
        req.data = doc;
        next();
    });

    createOneRoute = asyncHandler(async (req: IRequest, _res: Response, next: NextFunction) => {
        const doc = await this.model.create(req.body);
        req.data = doc;
        next();
    });
}