import { Express, Request, Response } from 'express';
import { PostRoutes } from './posts/posts.routes';

export const routes = (app: Express) => {
    app.get('/hello', (req: Request, res: Response) => {
        return res.json({
            message: 'Hello World !!'
        });
    });

    app.use('/posts', new PostRoutes().getRouter());
};
