import { Router, Request, Response, NextFunction } from 'express';
import {Book} from "@Shared/types";
import {BookRepository} from "../repository/booksRepository";
import {inject, injectable} from "inversify";
// import { verify } from 'jsonwebtoken';
// import * as jwt from 'jsonwebtoken';


interface IMiddleware {
    handle: (req: Request, res: Response, next: NextFunction) => void;
}

export abstract class Middleware implements IMiddleware {
    public handle(req: Request, res: Response, next: NextFunction) { }
}

export class LoggerMiddleware extends Middleware {
    constructor() {
        super();
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        console.log(req.method, req.path);

        next();
    }
}

interface ControllerRoute {
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    routePath: string;
    fn: (req: Request, res: Response, next: NextFunction) => void;
    middleware: IMiddleware[];
}

export class Controller {
    private readonly _router: Router;

    constructor() {
        this._router = Router();
    }

    protected bindRoutes(routes: ControllerRoute[]) {
        routes.forEach((route) => {
            // Не забываем сохранить this
            const ctxHandler = route.fn.bind(this);
            const routeHandlers = route.middleware ? [...route.middleware.map((m) => m.handle), ctxHandler] : '';
            this._router[route.method ??= 'get'](route.routePath, ctxHandler);
        })
    }

    get router() {
        return this._router;
    }
}

@injectable()
export class BooksService {
    constructor(private bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }
    public async getBooks() {
        return this.bookRepository.findAll();
    }

    public editBook(bookId: string | number) {
        return { success: true, book: {  } }
    }

    public removeBook(bookId: string | number) {
        return { success: true };
    }

    // public createBook(bookData: Book) {
    //     const book = new BookModel();
    //     book.setName(bookData.title);
    //
    //     return { success: true, book: bookData }
    // }
}

@injectable()
export class BooksController extends Controller {
    constructor(@inject(BooksService) private booksService: BooksService) {
        super();

        this.bindRoutes([
            {
                routePath: '/books',
                method: 'get',
                fn: this.getBookList,
                middleware: [new LoggerMiddleware()]
            }
        ])
    }

    public async getBookList(req: Request, res: Response) {
        const booksList = await this.booksService.getBooks();

        res.json(booksList);
    }
}

export class ValidateMiddleware extends Middleware {
    // Валидация может быть более комплексной
    public handle(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(422).send({ error: 'No username or password' })
        }
    }
}

// export class AuthController extends Controller {
//     constructor() {
//         super();
//
//         this.bindRoutes([
//             {
//                 routePath: '/register',
//                 method: 'post',
//                 fn: this.register,
//                 middleware: [new ValidateMiddleware()],
//             },
//             {
//                 routePath: '/login',
//                 method: 'post',
//                 fn: this.login,
//                 middleware: [new ValidateMiddleware()],
//             }
//         ])
//     }
//
//     private register(req: Request, res: Response, next: NextFunction) {
//         this.authService.registerUser(req.body);
//     }
// }
//
// export class AuthMiddleware extends Middleware {
//     public handle(req: Request, res: Response, next: NextFunction) {
//         const token = req.headers.Authorization!;
//         verify(token, process.env.JWTSECRET, (err: any, payload: any) => {
//             if (err) {
//                 res.status(401).send({ error: true })
//             } else {
//                 // Не забудьте дополнить types.d.ts для Express
//                 req.jwtPayload = payload;
//                 next();
//             }
//         })
//     }
// }

// jwt.sign({ email: 'example@mail.com', password: 'most-secure-password', iat: '2023-01-01 06:00:00' }, process.env.JWTSECRET, (err: any, token: any) => {
//     // На выходе получаем токен
//     console.log(token);
// })