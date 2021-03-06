import express from 'express';

// Bootstrap express
import expressConfig from './config/express';

const port = process.env.PORT || 3023;
const app = express();


app.use(express.static('public'));


expressConfig(app);

app.listen(port);
logger.info(`Server started on port ${port}`);

export default app;
