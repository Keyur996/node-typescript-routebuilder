import { IRouter, NextFunction, Response } from "express";
import { Post } from "../../entity/post.entity";
import { Base } from "../core/base";
import { IRequest } from "../core/base.type";

export class PostRoutes {
  private router: IRouter

  constructor() {
    this.router = new Base({
      collection: "posts",
      model: Post,
      types: {
        GET: {
          "ONE": {
            after: this.afterGet
          }
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
      data: req.data
    })
  }
}
