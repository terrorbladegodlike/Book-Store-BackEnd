import {TYPES} from "../../main";
import {inject, injectable} from "inversify";
import { PrismaClient } from '@prisma/client';

interface Book {
    id: '',
    name: string;
    price: number;
    currencyId: ''
}

@injectable()
export class DBService {
    private _client: PrismaClient

    constructor() {
        this._client = new PrismaClient();
    }

    get client() {
        return this._client;
    }
}

@injectable()
export class BookRepository {
    constructor(@inject(DBService) private dbService: DBService) {
        // В примере абстрактный DBService
        this.dbService = dbService;
    }

    public async findAll() {
        const booksWithAuthors = await this.dbService.client.book.findMany();

        // Если мы используем ORM
        return booksWithAuthors;
    }

    public async findById(bookId: string | number) {  }

    public async create(data: Book) {
        await this.dbService.client.book.create({
            data: {
                  name: 'Atlas Shrugged',
                  language: 'English',
                  price: 55,
                  currencyId: 1,
                author: {
                      create: {
                          author: {
                              create: {
                                  firstName: 'Ayn',
                                  lastName: 'Rand',
                                  yearsActive: 35
                              }
                          }
                      }
                }
              }
        })
    }
}

const bookRep = new BookRepository();

