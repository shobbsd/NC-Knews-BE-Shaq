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
  describe('/api/articles', () => {
    it('GET:200, should respond with an array of the articles', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('Array');
        expect(body.articles[0]).to.contain.keys(
          'author',
          'title',
          'article_id',
          'topic',
          'created_at',
          'votes',
        );
      }));
    it('GET:200, should respond with an array of the articles containing a comment count value equal to the number of comments', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).to.be.an('Array');
        expect(body.articles[0]).to.contain.keys('comment_count');
      }));
    it('GET:200, should respond with an array of the articles filtered by a specific author', () => request
      .get('/api/articles?author=icellusedkars')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].author).to.equal('icellusedkars');
      }));
    it('GET:200, should respond with an array of the articles filtered by a specific topic', () => request
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].topic).to.equal('mitch');
      }));
    it('GET:200, should respond with an array of the articles filtered by a specific topic order by date descending by default', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        const timeIndex0 = new Date(body.articles[0].created_at);
        const timeIndex1 = new Date(body.articles[1].created_at);
        expect(timeIndex0).to.be.greaterThan(timeIndex1);
      }));
    it('POST:201, should respond with an array of the articles filtered by a specific topic order by date descending by default', () => request
      .post('/api/articles')
      .send({
        title: 'this is a title',
        body: 'this is a body',
        topic: 'mitch',
        username: 'rogersop',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.article[0].article_id).to.equal(13);
      }));
    describe('/:article_id', () => {
      it('GET:200 should return an object with the requested article', () => {
        request
          .get('/api/articles/1')
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].article_id).to.equal(1);
          });
      });
      it('PATCH:201 should return an object with the requested article', () => {
        request
          .patch('/api/articles/1')
          .send({ inc_votes: 2 })
          .expect(201)
          .then(({ body }) => {
            expect(body.article[0].votes).to.equal(102);
          });
      });
      it('DELETE:204, should respond a status 204', () => request.delete('/api/articles/1').expect(204));
      describe('/comments', () => {
        it('GET:200 should respond with an array of comments associated with that id, order by date as default', () => {
          request
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({ body }) => {
              expect(body.comments[0]).to.contain.keys(
                'comment_id',
                'votes',
                'created_at',
                'author',
                'body',
              );
              const timeIndex0 = new Date(body.comments[0].created_at);
              const timeIndex1 = new Date(body.comments[1].created_at);
              expect(timeIndex0).to.be.greaterThan(timeIndex1);
            });
        });
        it('POST:201 should respond with the posted comment', () => {
          request
            .post('/api/articles/1/comments')
            .send({
              username: 'rogersop',
              body: 'I am a body',
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment[0].comment_id).to.equal(19);
            });
        });
      });
    });
  });
  describe('/api/comments/:comment_id', () => {
    it('PATCH: 201, should return the updated comment', () => {
      request
        .patch('/api/comments/2')
        .send({
          inc_votes: 3,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment[0].votes).to.equal(17);
          expect(body.comment[0].comment_id).to.equal(2);
        });
    });
    it('DELETE: 204', () => request.delete('/api/comments/2').expect(204));
  });
  describe('/api/users', () => {
    it('GET:200, Should return an array of users', () => {
      request
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.users[0].username).to.equal('butter_bridge');
        });
    });
    it('POST:201, Should return the posted user', () => {
      request
        .post('/api/users')
        .send({
          username: 'billyBob',
          avatar_url: 'https://www.longstring.com',
          name: 'bill',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user[0].username).to.equal('billyBob');
          expect(body.user[0].name).to.equal('bill');
        });
    });
  });
});
