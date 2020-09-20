let news = require('../routes/news');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /search GET route
  */
describe('/search GET ', () => {
  it('it should GET search results of news', (done) => {
    chai.request(server)
      .get('/api/news/search').query({ q: 'Bitcoin' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.articles.should.be.a('array');
        res.body.totalResults.should.be.gt(0);
        done();
      });
  });
});

/*
  * Test the / GET route
  */
 describe('/ GET ', () => {
  it('it should GET search results of latest UK news', (done) => {
    chai.request(server)
      .get('/api/news/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.articles.should.be.a('array');
        res.body.totalResults.should.be.gt(0);
        done();
      });
  });
});

/*
  * Test the / GET route
  */
 describe('/article/:id GET ', () => {
  it('it should GET particular search results of article', (done) => {
    chai.request(server)
      .get('/api/news/article/2').query({ q: 'Bitcoin',page: 1 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('title');
        done();
      });
  });
});