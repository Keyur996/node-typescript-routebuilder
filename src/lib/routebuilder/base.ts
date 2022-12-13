import { Model } from 'mongoose';
import express, { IRouter, NextFunction, Response } from 'express';
import { IRequest, ReqTypes } from './types/base.type';
import {
    GetMethods,
    GetReqType,
    Methods,
    OtherReqTypes
} from '@constants/base.constant';
import forEach from 'lodash/forEach';
import { Generator } from './generator';

interface IEntity<M> {
    collection: string;
    model: Model<M>;
    types: ReqTypes;
}

export class Base<M> extends Generator<M> {
    private readonly entity: IEntity<M>;
    private router: IRouter = express.Router();
    constructor(entity: IEntity<M>) {
        super(entity.model);
        this.entity = entity;
        this.activate();
    }

    private activate() {
        this.configureOptions();
        this.setRouter();
    }

    private configureVerbs(
        verb: OtherReqTypes | 'GET',
        methods: Array<GetMethods | Methods>
    ) {
        this.entity.types[verb] = this.entity.types[verb] ?? {};
        forEach(methods, (_method: 'ONE' | 'ONESOFT' | 'ALL') => {
            this.entity.types[verb]![_method] = {
                after:
                    this.entity.types[verb]?.[_method]?.after ??
                    this.noopMiddleWare,
                before:
                    this.entity.types[verb]?.[_method]?.before ??
                    this.noopMiddleWare
            };
        });
    }

    private configureOptions() {
        this.configureVerbs('GET', [GetMethods.ONE, GetMethods.ALL]);
        this.configureVerbs(OtherReqTypes.POST, [Methods.ONE, Methods.ONESOFT]);
        this.configureVerbs(OtherReqTypes.PATCH, [
            Methods.ONE,
            Methods.ONESOFT
        ]);
        this.configureVerbs(OtherReqTypes.PUT, [Methods.ONE, Methods.ONESOFT]);
    }

    private noopMiddleWare(req: IRequest, res: Response, next: NextFunction) {
        if (req.data) {
            req.status
                ? res.status(req.status).json(req.data)
                : res.json(req.data);
            delete req.data;
            return;
        }
        next();
    }

    getRouter() {
        return this.router;
    }

    getModel() {
        return this.entity.model;
    }

    private setRouter() {
        this.setGetRoutes();
        this.setPostRoutes();
        this.setPatchRoutes();
        this.setPutRoutes();
    }

    private setGetRoutes() {
        if (this.entity.types.GET) {
            this.router
                .route('/')
                .get(
                    this.entity.types[GetReqType.GET]![GetMethods.ALL].before,
                    this.getAllRoute,
                    this.entity.types[GetReqType.GET]![GetMethods.ALL].after
                );

            this.router
                .route('/:id')
                .get(
                    this.entity.types[GetReqType.GET]![GetMethods.ONE].before,
                    this.getOneRoute,
                    this.entity.types[GetReqType.GET]![GetMethods.ONE].after
                );
        }
    }

    private setPostRoutes() {
        if (this.entity.types.POST) {
            this.router
                .route('/')
                .post(
                    this.entity.types[OtherReqTypes.POST]![Methods.ONE].before,
                    this.createOneRoute,
                    this.entity.types[OtherReqTypes.POST]![Methods.ONE].after
                );

            this.router
                .route('/draft')
                .post(
                    this.entity.types[OtherReqTypes.POST]![Methods.ONESOFT]
                        .before,
                    this.createOneRoute,
                    this.entity.types[OtherReqTypes.POST]![Methods.ONESOFT]
                        .after
                );
        }
    }

    private setPatchRoutes() {
        if (this.entity.types.PATCH) {
            this.router
                .route('/:id')
                .patch(
                    this.entity.types[OtherReqTypes.PATCH]![Methods.ONE].before,
                    this.updateOneRoute,
                    this.entity.types[OtherReqTypes.PATCH]![Methods.ONE].after
                );

            this.router
                .route('/:id/draft')
                .patch(
                    this.entity.types[OtherReqTypes.PATCH]![Methods.ONESOFT]
                        .before,
                    this.updateOneRoute,
                    this.entity.types[OtherReqTypes.PATCH]![Methods.ONESOFT]
                        .after
                );
        }
    }

    private setPutRoutes() {
        if (this.entity.types.PUT) {
            this.router
                .route('/:id')
                .put(
                    this.entity.types[OtherReqTypes.PUT]![Methods.ONE].before,
                    this.updateOneRoute,
                    this.entity.types[OtherReqTypes.PUT]![Methods.ONE].after
                );

            this.router
                .route('/:id/draft')
                .put(
                    this.entity.types[OtherReqTypes.PUT]![Methods.ONESOFT]
                        .before,
                    this.updateOneRoute,
                    this.entity.types[OtherReqTypes.PUT]![Methods.ONESOFT].after
                );
        }
    }
}
