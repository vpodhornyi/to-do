let url = 'http://localhost:3007';
let db = require('../db/db');
const conf = require('../config/server').database;
const app = require('../app');

const server = app.listen(3007);

let chai = require('chai');
require('chai').should();
let chaiHttp = require('chai-http');

let id = null;
const listsExample = {
  title: "Title",
  itemsList: [
    {
      name: "name",
      isDone: true
    },
    {
      name: "another name",
      isDone: false
    }
  ],
  color: "rgb(215, 174, 251)"
};

const listsExamplePut = {
  title: "Title",
  itemsList: [
    {
      name: "name PUT",
      isDone: false
    },
    {
      name: "another name PUT",
      isDone: true
    }
  ],
  color: "rgb(215, 174, 251)"
};

chai.use(chaiHttp);

describe('Lists', () => {

  before((done) => {
    db.dropCollection(conf.dbName, conf.collectionLists)
      .then(() => {
        done();
      });
  });

  after(() => {
    server.close();
  });

  describe('/POST api/lists', () => {
    it('it should POST lists data and return notes db ID', (done) => {

      chai.request(url)
        .post('/api/lists')
        .set('content-type', 'application/json')
        .send(JSON.stringify(listsExample))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.type.should.be.eql('success');
          res.body.message.should.be.eql('Lists have been saved!');
          id = res.body.id;
          id.length.should.be.eql(24);//24
          done();
        });
    });

    it('it shouldn\'t POST notes data no valid data, error 400', (done) => {

      chai.request(url)
        .post('/api/notes')
        .set('content-type', 'application/json')
        .send({
          title: "Title",
          itemsList: [
            {
              name: "name",
              isDone: true
            },
            {
              name: "another name",
              isDone: false
            }
          ],
          color: "rgbAA(215, 174, 251)"
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.type.should.be.eql('error');
          res.body.message.should.be.eql('Invalid data');
          done();
        });
    });
  });

  describe('/PUT api/lists/id', () => {
     it('it should PUT lists data and return success message', (done) => {

       chai.request(url)
         .put(`/api/lists/${id}`)
         .set('content-type', 'application/json')
         .send(JSON.stringify(listsExamplePut))
         .end((err, res) => {
           res.should.have.status(200);
           res.body.type.should.be.eql('success');
           res.body.message.should.be.eql('Lists have been updated!');
           done();
         });
     });

     it('it shouldn\'t PUT notes data (no exist ID) and return error 500', (done) => {

       chai.request(url)
         .put(`/api/lists/${123}`)
         .set('content-type', 'application/json')
         .send(JSON.stringify(listsExamplePut))
         .end((err, res) => {
           res.should.have.status(500);
           res.body.type.should.be.eql('error');
           res.body.message.should.be.eql('Something broke!');
           done();
         });
     });

     it('it shouldn\'t PUT lists data (color data Invalid) and return error 400', (done) => {

       listsExamplePut.color = 'rgb(204S, 255, 144)';

       chai.request(url)
         .put(`/api/lists/${id}`)
         .set('content-type', 'application/json')
         .send(JSON.stringify(listsExamplePut))
         .end((err, res) => {
           res.should.have.status(400);
           res.body.type.should.be.eql('error');
           res.body.message.should.be.eql('Invalid data');
           done();
         });
     });
   });

   describe('/GET lists', () => {
     it('it should GET create lists page', (done) => {
       chai.request(url)
         .get('/lists')
         .end((err, res) => {
           res.should.have.status(200);
           done();
         });
     });

     it('it should GET exist lists page', (done) => {
       chai.request(url)
         .get(`/lists/${id}`)
         .end((err, res) => {
           res.should.have.status(200);
           done();
         });
     });

     it('it should\'t GET, error 404 no exist lists page', (done) => {
       chai.request(url)
         .get('/lists/233434')
         .end((err, res) => {
           res.should.have.status(404);
           done();
         });
     });
   });

   describe('/DELETE lists', () => {
     it('it should DELETE exist lists', (done) => {
       chai.request(url)
         .delete(`/api/lists/${id}`)
         .end((err, res) => {
           res.should.have.status(200);
           res.body.type.should.be.eql('success');
           res.body.message.should.be.eql('Lists have been deleted!');
           done();
         });
     });

     it('it shouldn\'t DELETE lists error 500 no exist ID', (done) => {
       chai.request(url)
         .delete(`/api/lists/123`)
         .end((err, res) => {
           res.should.have.status(500);
           res.body.type.should.be.eql('error');
           res.body.message.should.be.eql('Something broke!');
           done();
         });
     });
   });
});
