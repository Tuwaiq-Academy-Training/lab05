import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { addBookController } from '../controllers/books';

const Book = Type.Object({
	id: Type.String({ format: 'uuid' }),
	book_name: Type.String(),
	book_number: Type.String(),
});
type Book = Static<typeof Book>;

const GetFavoriteBooksQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetFavoriteBooksQuery = Static<typeof GetFavoriteBooksQuery>;

export let books: Book[] = [
	{ id: '1', book_name: 'HangBook', book_number: '001' },
	{ id: '2', book_name: 'YourBook', book_number: '002' },
	{ id: '3', book_name: 'NanoBook', book_number: '003' },
	
];

export default async function (server: FastifyInstance) {
	
    
    
    server.route({
		method: 'GET',
		url: '/books',
		schema: {
			summary: 'Gets all books',
			tags: ['Books'],
			querystring: GetFavoriteBooksQuery,
			response: {
				'2xx': Type.Array(Book),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetFavoriteBooksQuery;

			if (query.name) {
				return books.filter((c) => c.book_name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});
    

    server.route({
		method: 'PATCH',
		url: '/books/:id',
		schema: {
			summary: 'Update a book by id ',
			tags: ['Books'],
			body: Type.Partial(Book),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newBook: any = request.body;
			return addBookController(books, newBook);
		},
	});

	server.route({
		method: 'DELETE',
		url: '/books/:id',
		schema: {
			summary: 'Deletes a book',
			tags: ['Books'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			books = books.filter((c) => c.id !== id);

			return books;
		},
	});



    server.route({
		method: 'GET',
		url: '/favbooks/:id',
		schema: {
			summary: 'Gets favorite book for one user',
			tags: ['Books'],
			querystring: GetFavoriteBooksQuery,
			response: {
				'2xx': Type.Array(Book),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetFavoriteBooksQuery;

			if (query.name) {
				return books.filter((c) => c.book_name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});


    
    server.route({
		method: 'GET',
		url: '/allfavbooks',
		schema: {
			summary: 'Gets the favorite book',
			tags: ['Books'],
            params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			querystring: GetFavoriteBooksQuery,
			response: {
				'2xx': Type.Array(Book),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetFavoriteBooksQuery;

			if (query.name) {
				return books.filter((c) => c.book_name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});



}
