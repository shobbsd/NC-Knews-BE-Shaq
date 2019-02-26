process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { expect } = require('chai');

const connection = require('../db/connection');
const app = require('../app');

const request = supertest(app);

request.get('/api/topics');

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET:200, should respond with an array containing all the topics ', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).to.equal(2);
        expect(body[0]).to.contain.keys('slug', 'description');
      }));
    it('POST:201, should respond with the newly created record ', () => request
      .post('/api/topics')
      .send({
        slug: 'This is a slug',
        description: 'this is a description',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).to.contain.keys('slug', 'description');
      }));
    it('POST:400, should respond with an error if given an incorrect body', () => request
      .post('/api/topics')
      .send({
        sloeg: 'This is a slug', // the error here is the spelling of sloeg
        description: 'this is a description',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.equal('incorrect data within the body');
      }));
  });
});
