import Fastify from 'fastify';
import userRoutes from './routes/players';
import clubRoutes from './routes/clubs';

const app = Fastify({ logger: true });

app.register(userRoutes);
app.register(clubRoutes);

export default app;
