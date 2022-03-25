import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Club';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Autenticação da rota "/clubs"', () => {
  let chaiHttpResponse: Response;
  const mockClubs = [
    {
      id: 1,
      club_name: 'Avaí/Kindermann',
    },
    {
      id: 2,
      club_name: 'Bahia',
    },
    {
      id: 3,
      club_name: 'Botafogo',
    },
  ]

  before(async () => {
    sinon.stub(Clubs, 'findAll').resolves(mockClubs as unknown as Clubs[]);
  });

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('Em caso de sucesso retorna um array de clubs', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs');
    expect(chaiHttpResponse.body).to.deep.equal(mockClubs);
  });

  it('Em caso de sucesso retorna um status 200', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('Autenticação da rota "clubs/:id"', () => {
  let chaiHttpResponse: Response;
  const mockClubs = [
    {
      id: 1,
      club_name: 'Avaí/Kindermann',
    },
    {
      id: 2,
      club_name: 'Bahia',
    },
    {
      id: 3,
      club_name: 'Botafogo',
    },
  ]

  before(async () => {
    sinon.stub(Clubs, 'findAll').resolves(mockClubs[0] as unknown as Clubs[]);
  });

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se a informação retorna correta ao passar um id valido', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/2');
    expect(chaiHttpResponse.body).to.deep.equal(mockClubs[1]);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se a informação retorna incorreta ao passar um id invalido', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/a');
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Verifica se a informação retorna incorreta ao passar um id inexistente', async () => {
    chaiHttpResponse = await chai.request(app).get('/clubs/999');
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});