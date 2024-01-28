import express, { Express } from 'express';
import { json } from 'body-parser';
import {BooksRouter} from "./api/v1/books-api";
import {injectable} from "inversify";
import 'reflect-metadata';
import {Controller} from "./controllers/baseController";

@injectable()
export class App {
    private app: Express;
    private booksRouter: Controller;

    private readonly port: number;
    host: string;

    constructor() {
        this.app = express();
        this.port = Number(process.env.LOCAL_PORT) || 3000;
        this.host = process.env.LOCAL_HOST!
        this.booksRouter = new Controller();
    }

    private configureRoutes() {
        this.app.use('/', this.booksRouter.router);
    }

    public async run() {
        this.app.use(json());
        this.app.listen(this.port, this.host!,() => {
            console.log(`Приложение запущено на порту ${this.port}!`);
        })
        this.configureRoutes();
    }
}