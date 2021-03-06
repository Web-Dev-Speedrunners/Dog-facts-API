import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './router';
import errorRequestHandler from './error/error_request_handler';

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(router);
app.use(errorRequestHandler);

export default app;
