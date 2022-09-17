import { Post } from "../../entity/post.entity";
import { Base } from "../core/base";

export class PostRoutes extends Base {

    constructor() {
        super({
            collection: 'posts',
            model: Post,
            types: {
                GET: {},
                POST: {},
                PATCH: {}
            }
        });
    }
}