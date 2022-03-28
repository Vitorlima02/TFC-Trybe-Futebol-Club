import * as express from 'express';
import * as cors from 'cors';
import LoginController from './database/controllers/loginController';
import validateSchema from './database/middlewares/validateLogin';
import ClubsController from './database/controllers/clubsController';
import MatchController from './database/controllers/matchsController';

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
    this.app.use(cors());

    this.app.post('/login', validateSchema, LoginController.login);
    this.app.get('/login/validate', LoginController.validateLogin);
    this.app.get('/clubs', ClubsController.getAllClubs);
    this.app.get('/clubs/:id', ClubsController.findById);
    this.app.get('/matchs', MatchController.getAllMatchs);
    this.app.post('/matchs', MatchController.verifyEqualTeams, MatchController.addMatch);
    this.app.patch('/matchs/:id/finish', MatchController.finishMatch);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
