import { server } from './server';


	server.listen({ port: 3001 }).catch((err) => {
		server.log.error(err);
		process.exit(1);
	});

