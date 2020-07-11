import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { gradeRouter } from './routes/gradeRouter.js';
import { logger } from './config/logger.js';
import { db } from './models/index.js';

import request from 'request';
const fixieRequest = request.defaults({ proxy: process.env.FIXIE_URL });

fixieRequest(db.url, (err, res, body) => {
  console.log(`Got response: ${res.statusCode}`);
});

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();
const PORT = process.env.PORT || 8081;
const CORS_ORIGIN = 'https://my-grades-app-igti.herokuapp.com';

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use(gradeRouter);

app.get('/', (_, res) => {
  res.send('API em execucao');
});

app.listen(PORT, () => {
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
});
