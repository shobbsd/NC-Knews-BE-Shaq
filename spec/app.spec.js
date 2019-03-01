process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { expect } = require('chai');

const connection = require('../db/connection');
const app = require('../app');

const request = supertest(app);

request.get('/api/topics');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it('/bad-url', () => request
    .get('/bad-url')
    .expect(404)
    .then(({ body }) => {
      expect(body).to.eql({ msg: 'Looks like you have put in an incorrect address' });
    }));
  describe('/topics', () => {
    it('GET:200, should respond with an array containing all the topics ', () => request
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics.length).to.equal(2);
        expect(body.topics[0]).to.contain.keys('slug', 'description');
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
        expect(body).to.eql({ msg: 'No matching columns' });
      }));
    it('POST:422, should respond with an error if a slug that exists is entered', () => request
      .post('/api/topics')
      .send({
        slug: 'mitch',
        description: 'this is a description',
      })
      .expect(422)
      .then(({ body }) => {
        expect(body).to.contain.keys('msg');
      }));
    it('DELETE:405, should return with a message', () => request
      .delete('/api/topics')
      .expect(405)
      .then(({ body }) => {
        const method = 'DELETE';
        expect(body).to.eql({ msg: `The ${method} method is not allowed at this endpoint` });
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
    it('GET:200, should respond with an array of the articles limited to 10', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).to.equal(10);
      }));
    it('GET:200, should contain an object with the total_count', () => request
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
        expect(body.total_count).to.be.a('number');
      }));
    it('GET:200, should respond with an array of the articles limited to 10', () => request
      .get('/api/articles?p=2')
      .expect(200)
      .then(({ body }) => {
        expect(body.articles[0].article_id).to.equal(11);
      }));
    it('GET:400, should return an error, explaining the sort_by column doesnt exist', () => request
      .get('/api/articles?sort_by=dmkl')
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'No matching columns' });
      }));
    it('GET:400, should return an error, explaining the order is incorrect', () => request
      .get('/api/articles?order=dmkl')
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'That is not an accepted order, use "asc" or "desc"' });
      }));
    it.only('GET:400, should return an error, explaining the author is incorrect', () => request
      .get('/api/articles?author=dmkl')
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'The author dmkl does not exist as a user' });
      }));
    it('GET:404, should return an error, the topic doesnt exist', () => request
      .get('/api/articles?topic=dmkl')
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: '"dmkl" does not exist as a topic' });
      }));
    it('GET:200, should return an empty array if the topic exists but contains no articles', () => {
      request
        .post('/api/topics')
        .send({
          slug: 'test',
          description: 'this is a description',
        })
        .then(() => request
          .get('/api/articles?topic=test')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.eql({ total_count: 0, articles: [] });
          }));
    });
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
        expect(body.article.article_id).to.equal(13);
      }));
    it('POST:400, error should explain that there is an error in the body ', () => request
      .post('/api/articles')
      .send({
        title: 'this is a title',
        body: 'this is a body',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'There is data missing in the body for this post' });
      }));
    it('POST:400, error should explain that there are no authors/topics by that name', () => request
      .post('/api/articles')
      .send({
        title: 'this is a title',
        body: 'this is a body',
        topic: 'mitc',
        username: 'rogersop',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({
          msg: 'Something doesnt exist, either the topic or the username or the article',
        });
      }));
    describe('/:article_id', () => {
      it('GET:200 should return an object with the requested article', () => request
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).to.equal(1);
        }));
      it('GET:400 should return a msg explaining the article must be an id', () => request
        .get('/api/articles/dog')
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'article_id must be a number' });
        }));
      it('GET:404 should return an msg explaining that id does not exist', () => request
        .get('/api/articles/999')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'The article_id (999) does not exist' });
        }));
      it('PATCH:201 should return an object with the requested article', () => request
        .patch('/api/articles/1')
        .send({ inc_votes: 2 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(102);
        }));
      it('PATCH:400 should inform the user that info is missing from the body', () => request
        .patch('/api/articles/1')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({
            msg: 'Either there are no votes, or the change in votes is not a number',
          });
        }));
      it('PATCH:400 should inform the user that info is missing from the body', () => request
        .patch('/api/articles/1')
        .send({ inc_votes: 2, name: 'Hobbsy' })
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'There are too many items in the body' });
        }));
      it('DELETE:204, should respond a status 204', () => request.delete('/api/articles/1').expect(204));
      it('DELETE:400, should inform the user the id is incorrect (incorrect format)', () => request
        .delete('/api/articles/fish')
        .expect(400)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'The article_id must be a number' });
        }));
      it('DELETE:404, should inform the user the id doesnt exist', () => request
        .delete('/api/articles/94875')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'This id doesnt exist' });
        }));
      describe('/comments', () => {
        it('GET:200 should respond with an array of comments associated with that id, order by date as default', () => request
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
          }));
        it('GET:404 Should inform the user there are no comments for this article', () => request
          .get('/api/articles/12/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({
              msg:
                  'There are no messages associated with this article, or there is no article with this ID',
            });
          }));
        it('GET:400 Should inform the user the id format is incorrect', () => request
          .get('/api/articles/fish/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'The article_id must be a number' });
          }));
        it('GET:404 Should inform the user the id is not one currently in the database', () => request
          .get('/api/articles/9999/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({
              msg:
                  'There are no messages associated with this article, or there is no article with this ID',
            });
          }));
        it('POST:201 should respond with the posted comment', () => request
          .post('/api/articles/1/comments')
          .send({
            username: 'rogersop',
            body: 'I am a body',
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment.comment_id).to.equal(19);
          }));
        it('POST:400 should inform the user that there are missing elements in the body', () => request
          .post('/api/articles/1/comments')
          .send({
            username: 'rogersop',
            // body: 'I am a body',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'There is data missing in the body for this post' });
          }));
        it('POST:400 should inform the user that there is an issue with the article_id', () => request
          .post('/api/articles/fish/comments')
          .send({
            username: 'rogersop',
            body: 'I am a body',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: 'The article_id must be a number',
            });
          }));
        it('POST:400 should inform the user that there are no users with that username', () => request
          .post('/api/articles/1/comments')
          .send({
            username: 'junior',
            body: 'I am a body',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: 'Something doesnt exist, either the topic or the username or the article',
            });
          }));
        it('POST:400 should inform the user that there are no articles with that id', () => request
          .post('/api/articles/99/comments')
          .send({
            username: 'junior',
            body: 'I am a body',
          })
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({
              msg: 'Something doesnt exist, either the topic or the username or the article',
            });
          }));
      });
    });
  });
  describe('/api/comments/:comment_id', () => {
    it('PATCH: 201, should return the updated comment', () => request
      .patch('/api/comments/2')
      .send({
        inc_votes: 3,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.votes).to.equal(17);
        expect(body.comment.comment_id).to.equal(2);
      }));
    it('PATCH: 400, should return a message explaining that there is something wrong with the body', () => request
      .patch('/api/comments/2')
      .send({
        // inc_votes: 3,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({
          msg: 'Either there are no votes, or the change in votes is not a number',
        });
      }));
    it('PATCH: 400, should return a message explaining that there is something wrong with the body', () => request
      .patch('/api/comments/2')
      .send({
        inc_votes: 3,
        name: 'awesome',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({
          msg: 'There are too many items in the body',
        });
      }));
    it('PATCH: 404, should return a message explaining that the ID doesnt exist', () => request
      .patch('/api/comments/99')
      .send({
        inc_votes: 3,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'This id doesnt exist' });
      }));
    it('DELETE: 204', () => request.delete('/api/comments/2').expect(204));
    it('DELETE:404, should inform the user the id doesnt exist', () => request
      .delete('/api/comments/99')
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'This id doesnt exist' });
      }));
    it('DELETE:400, should inform the user the id is incorrect (incorrect format)', () => request
      .delete('/api/comments/doughnut')
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'The article_id must be a number' });
      }));
  });
  describe('/api/users', () => {
    it('GET:200, Should return an array of users', () => request
      .get('/api/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.users[0].username).to.equal('butter_bridge');
      }));
    it('POST:201, Should return the posted user', () => request
      .post('/api/users')
      .send({
        username: 'billyBob',
        avatar_url: 'https://www.longstring.com',
        name: 'bill',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.user.username).to.equal('billyBob');
        expect(body.user.name).to.equal('bill');
      }));
    it('POST:400, Should return a message alerting the user there are element missing from the body', () => request
      .post('/api/users')
      .send({
        username: 'billyBob',
        avatar_url: 'https://www.longstring.com',
        // name: 'bill',
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'There is data missing in the body for this post' });
      }));
    describe('/:username', () => {
      it('GET:200, should return the corresponding user', () => request
        .get('/api/users/rogersop')
        .expect(200)
        .then(({ body }) => {
          expect(body.user.username).to.equal('rogersop');
        }));
      it('GET:404, should return the corresponding user', () => request
        .get('/api/users/rogersp')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'This user does not exist' });
        }));
    });
  });
});
