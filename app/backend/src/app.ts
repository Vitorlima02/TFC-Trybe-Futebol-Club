import * as express from 'express';
import LoginController from './database/controllers/loginController';
import validateSchema from './database/middlewares/validateLogin';
import ClubsController from './database/controllers/clubsController';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(accessControl);
    this.app.use(express.json());

    this.app.post('/login', validateSchema, LoginController.login);
    this.app.get('/login/validate', LoginController.validateLogin);
    this.app.get('/clubs', ClubsController.getAllClubs);
    this.app.get('/clubs/:id', ClubsController.findById);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
