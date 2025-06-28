import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';
import chatRoutes from './routes/chatRoutes';
import contextRoutes from './routes/contextRoutes';
import ngrokRoutes from './routes/ngrokRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/contexts', contextRoutes);
app.use('/api/ngrok', ngrokRoutes);

export default app; 