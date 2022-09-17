import express, { Express } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
// @ts-ignore
import xss from "xss-clean";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app: Express = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan Logger
app.use(morgan('dev'));

// cors setUp
app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200', 'http://localhost:3000']
}));

// Cookie Parser
app.use(cookieParser());

// helmet - For Setting Security Headers.
app.use(helmet());

// hpp - To prevent query String pollutation.
app.use(hpp());

// xss-clean
app.use(xss());

// Set Routes
routes(app);

// Error Handler MiddleWare
app.use(errorHandler);

export default app;
