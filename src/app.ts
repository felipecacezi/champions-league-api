import Fastify from 'fastify';
import userRoutes from './routes/players';

const app = Fastify({ logger: true });
app.register(userRoutes);

export default app;
