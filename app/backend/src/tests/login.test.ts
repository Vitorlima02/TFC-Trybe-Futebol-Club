import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Autenticação do /Login', () => {
  
  let chaiHttpResponse: Response;

  const mock = [
    {
      user: {
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com.br',
      },
      token: '123.456.789'
    },
  ]

  const mockLogin = {
    username: 'admin',
    email: 'admin@admin.com.br'
  }

  before(async () => {
    sinon
      .stub(User, 'findAll')
      .resolves(mock as any[]);
  });

  after(() => {
    (User.findAll as sinon.SinonStub).restore();
  })
  
  it('Verifica se o retorno retorna status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(mockLogin)

    expect(chaiHttpResponse.status).to.have.status(200);
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(false);
  });
});
