import {App} from "./src/App";
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import {Container, injectable} from "inversify";
import {BooksController} from "./src/controllers/baseController";
import {DBService} from "./src/repository/booksRepository";

dotenv.config();

export const TYPES = {
    BooksController: Symbol.for('BooksController'),
    BooksService: Symbol.for('BooksService'),
    BookRepository: Symbol.for('BookRepository'),
    App: Symbol.for('App'),
    DBService: Symbol.for('DBService')
}

async function bootstrap() {
    const iocContainer = new Container();
    iocContainer.bind<BooksController>(TYPES.BooksController).to(BooksController);
    iocContainer.bind<App>(TYPES.App).to(App);

    const app = iocContainer.get(TYPES.App);
    // @ts-ignore
    await app.run();

    iocContainer.bind < DBService > (TYPES.DBService).to(DBService).inSingletonScope();
}

bootstrap();