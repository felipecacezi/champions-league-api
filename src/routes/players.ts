import { FastifyInstance } from 'fastify';

export default async function players(app: FastifyInstance) {

  app.get('/players', async (req, res) => {
    res.code(200).send({ 
        hello: 'world teste',
    });

  });

}
