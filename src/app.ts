import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import UsersRouter from './resources/users/users.router';
import commentRouter from './resources/comment/comment.router';
import postRouter from './resources/post/post.router';

const app = express();
const swaggerDocument = YAML.load(path.resolve(__dirname, '..', 'doc', 'api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (_req: Request, res: Response, next: NextFunction) => {
  if (_req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', UsersRouter);
app.use('/comment', commentRouter);
app.use('/post', postRouter)

export default app;
