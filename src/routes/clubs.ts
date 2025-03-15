import { FastifyInstance } from 'fastify';
import { ClubsController } from '../controllers/clubs';

export default async function clubs(app: FastifyInstance) {
    app.post('/club', ClubsController.create);
    app.get('/clubs', ClubsController.list);
    app.get('/club/:parameter/:value', ClubsController.get);
}
