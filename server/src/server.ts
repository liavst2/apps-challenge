import { Application } from 'express';
import { Server as HttpServer } from 'http';

import { configSocket } from './server-config';
import { configServerRouting } from './server-routing';
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";


export class Server {

	app: Application;
	internalApp: Application;
	server: HttpServer;

	public static bootstrap(server: Server, app: Application): Server {
		return new Server(server, app, internalApp, io);
	}

	constructor(server, app, internalApp, io) {
		this.server = server;
		this.internalApp = internalApp;
		this.app = app;

		this.config();
		this.routes();

	}

	public config() {

		this.app.disable('x-powered-by');
		this.app.enable("trust proxy");
		morgan(":method :url :status :res[content-length] - :response-time ms");
		this.app.use(morgan("dev"));
		this.app.use(helmet());
		this.app.use(bodyParser.json());
	}

	private routes() {
		configServerRouting(this.app);
	}

}
