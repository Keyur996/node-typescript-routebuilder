import { IRouter, NextFunction, Response } from 'express';
import { Post } from '../../models/post.entity';
import { Base } from '../../lib/routebuilder/base';
import { IRequest } from '../../lib/routebuilder/types/base.type';

export class PostRoutes {
  private router: IRouter;

  constructor() {
    this.router = new Base({
      collection: 'posts',
      model: Post,
      types: {
        GET: {
          ONE: {
            after: this.afterGet,
          },
        },
        POST: {},
        PATCH: {},
      },
    }).getRouter();
  }

  getRouter() {
    return this.router;
  }

  afterGet(req: IRequest, res: Response, _next: NextFunction) {
    // console.log("Response After GET", req.data);
    return res.json({
      success: true,
      data: req.data,
    });
  }
}
