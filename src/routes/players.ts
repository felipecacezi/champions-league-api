import { FastifyInstance } from 'fastify';
import { PlayersController } from '../controllers/players';

export default async function players(app: FastifyInstance) {
  app.get('/players', PlayersController.list);
  app.get('/player/:parameter/:value', PlayersController.get);
  app.post('/player', PlayersController.create);
  app.put('/player/:id', PlayersController.update);
  app.delete('/player/:id', PlayersController.delete);
}
