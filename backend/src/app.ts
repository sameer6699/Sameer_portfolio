import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';
import chatRoutes from './routes/chatRoutes';
import contextRoutes from './routes/contextRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contexts', contextRoutes);

export default app; 