import { NextFunction, Response } from 'express';
import { Model } from 'mongoose';
import { IRequest } from './types/base.type';
import { HttpException } from '@/exceptions/HttpException';
import asyncHandler from 'express-async-handler';

export class Generator<M> {
    private model: Model<M>;

    constructor(model: Model<M>) {
        this.model = model;
    }

    protected getOneRoute = asyncHandler(
        async (req: IRequest, _res: Response, next: NextFunction) => {
            const doc = await this.model.findById(req.params.id).lean();
            if (!doc) {
                next(new HttpException('No Record Found', 404));
            }
            req.data = doc;
            next();
        }
    );

    protected getAllRoute = asyncHandler(
        async (req: IRequest, _res: Response, next: NextFunction) => {
            const query: any = this.model.find((req.query as any) ?? {});
            if (req.query?.select) {
                query.select(req.query?.select);
            }
            const docs = await query;
            if (!docs) {
                next(new HttpException('No Document Found With given Id', 404));
            }
            req.data = docs;
            next();
        }
    );

    protected updateOneRoute = asyncHandler(
        async (req: IRequest, _res: Response, next: NextFunction) => {
            const doc = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );
            if (!doc) {
                next(new HttpException('No Document Found With given Id', 404));
            }
            req.data = doc;
            next();
        }
    );

    protected deleteOneRoute = asyncHandler(
        async (req: IRequest, _res: Response, next: NextFunction) => {
            const doc = await this.model.findByIdAndDelete(req.params.id);

            if (!doc) {
                next(new HttpException('No Document Found With given Id', 404));
            }
            req.data = doc;
            next();
        }
    );

    protected createOneRoute = asyncHandler(
        async (req: IRequest, _res: Response, next: NextFunction) => {
            const doc = await this.model.create(req.body);
            req.data = doc;
            next();
        }
    );
}
