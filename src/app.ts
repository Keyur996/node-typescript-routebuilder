// ==================== Import Packages ========================
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import xss from 'xss-clean';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Server, IncomingMessage, ServerResponse } from 'http';
// =============================================================
import { DB_URI, NODE_ENV, PORT } from '@/config';
import DBConnection from '@utils/dbConnect';
import { Route } from '@interfaces/route.interface';
import { errorHandler } from '@middlewares/errorHandler';

export default class App {
    private readonly env: string;
    private readonly port: number;
    private readonly app: express.Application;
    public server?: Server<typeof IncomingMessage, typeof ServerResponse>;

    constructor(routes: Route[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = (PORT && +PORT) || 5000;
        this.setMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandler();
    }

    public readonly listen = async () => {
        this.server = this.app.listen(this.port, () => {
            process.stdout.write(`
              =====================================
              ========= ENV: ${this.env} ==========
              🚀 App listening on the port ${this.port}
              =====================================
            `);
        });
        await DBConnection.connect(DB_URI || '');
    };

    private readonly setMiddlewares = () => {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(xss());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cookieParser());
    };

    private readonly initializeRoutes = (routes: Route[]) => {
        routes.map((route) => {
            this.app.use('/', route.router);
        });
    };

    private readonly initializeErrorHandler = () => {
        this.app.use(errorHandler);
    };
}
