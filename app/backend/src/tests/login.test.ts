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

  const mockResponse = {
    user: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  }

  const mockLogin = {
    id: 1,
    username: 'admin',
    role: 'admin',
    password: 'secret_admin',
    email: 'admin@admin.com'
  }

  before(async () => {
    sinon.stub(User, 'findOne').resolves(mockLogin as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })
  
  it('Verifica se o retorno contem os dados esperados', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }
    chaiHttpResponse = await chai.request(app).post('/login').send(payload);
    expect(chaiHttpResponse.body.user.id).to.be.equal(mockResponse.user.id);
    expect(chaiHttpResponse.body.user.username).to.be.equal(mockResponse.user.username);
    expect(chaiHttpResponse.body.user.role).to.be.equal(mockResponse.user.role);
    expect(chaiHttpResponse.body.user.email).to.be.equal(mockResponse.user.email);
    expect(chaiHttpResponse.body.token).to.be.contains(mockResponse.token);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se retorna um objeto', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    }
    chaiHttpResponse = await chai.request(app).post('/login').send(payload);
    expect(chaiHttpResponse.body).to.be.an('object');
  });

  it('Verifica se retorna um erro ao passar uma informação errada', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: 'pass'
    }
    chaiHttpResponse = await chai.request(app).post('/login').send(payload)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Verifica se retorna um erro quando uma das informações obrigatórias não existe', async () => {
    const payload = {
      email: 'admin@admin.com',
      
    }
    chaiHttpResponse = await chai.request(app).post('/login').send(payload)
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  });
});
