import { Router } from 'express';
import {Book} from "@Shared/types";

const booksPlaceholder: Book[] = [];

export class BooksRouter {
    private readonly _router: Router;

    constructor() {
        this._router = Router();

        this._router.get('/', (req, res) => {
            res.send('Hello')
        })
    }

    get router() {
        return this._router;
    }
}