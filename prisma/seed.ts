import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import {v4 as uuidv4} from 'uuid';
import {id} from "inversify";

async function add() {
    // await prisma.author.create({
    //     data: {
    //         firstName: 'Suzanne',
    //         lastName: 'Collins',
    //         yearsActive: 12,
    //     }
    // })
    // await prisma.book.create({
    //   data: {
    //       name: 'The Mockingjay',
    //       language: 'English',
    //       price: 24,
    //       currencyId: 1
    //   }
    // })
    await prisma.bookAuthors.create({
        data: {
            // @ts-ignore
            bookId: 2,
            // @ts-ignore
            authorId: 1,
        }
    })
    // await prisma.bookCategories.create({
    //     data: {
    //         // @ts-ignore
    //         bookId: prisma.book.fields.id,
    //         // @ts-ignore
    //         categoryId: prisma.category.fields.id,
    //     }
    // })
    // await prisma.category.create({
    //     data: {
    //         // @ts-ignore
    //         createdAt: Date.now(),
    //         // @ts-ignore
    //         name: 'Horror'
    //     }
    // })
    // await prisma.currency.createMany({
    //     // @ts-ignore
    //     data: [
    //         {
    //             name: 'Dollar',
    //             acronym: 'USD'
    //         },
    //         {
    //             name: 'Pound',
    //             acronym: 'GBP'
    //         },
    //         {
    //             name: 'Ruble',
    //             acronym: 'RUB'
    //         }
    //     ],
    //     skipDuplicates: true
    // })
    // await prisma.rating.create({
    //     // @ts-ignore
    //     data: {
    //         value: 0,
    //         comment: 'Interesting'
    //     }
    // })
    // await prisma.user.create({
    //     // @ts-ignore
    //     data: {
    //         name: 'Zaur',
    //         email: 'zaur@mail.ru',
    //         password: 'zaurbayern',
    //         dob: '01.11.1989'
    //     }
    // })
    // await prisma.userBooks.create({
    //     data: {
    //         // @ts-ignore
    //         userId: prisma.user.fields.id,
    //         // @ts-ignore
    //         bookId: prisma.book.fields.id,
    //     }
    // })

    const allUsers = await prisma.bookAuthors.findMany({
        include: {
            book: true,
            author: true
        }
    })
    console.log(allUsers)
}

add()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })