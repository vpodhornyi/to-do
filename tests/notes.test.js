let url = 'http://localhost:3006';
let db = require('../db/db');
const conf = require('../config/server').database;
const app = require('../app');

const server = app.listen(3006);

let chai = require('chai');
require('chai').should();
let chaiHttp = require('chai-http');

let id = null;
const notesExample = {
  color: 'rgb(215, 174, 251)',
  title: 'Test title',
  description: [
    'test',
    'test',
    'test'
  ]
};

const notesExamplePut = {
  color: 'rgb(204, 255, 144)',
  title: 'Test title PUT',
  description: [
    'test PUT',
    'test PUT',
    'test PUT'
  ]
};

chai.use(chaiHttp);

describe('Notes', () => {

  before((done) => {
    db.dropCollection(conf.dbName, conf.collectionNotes)
      .then(() => {
        done();
      });
  });

/*  after(() => {
    server.close(() => {
      console.log('Server close!');
    });
  });*/

  describe('/POST api/notes', () => {
    it('it should POST notes data and return notes db ID', (done) => {

      chai.request(url)
        .post('/api/notes')
        .set('content-type', 'application/json')
        .send(JSON.stringify(notesExample))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.type.should.be.eql('success');
          res.body.message.should.be.eql('Notes have been saved!');
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
          color: 'rgb(215, 174, 251)',
          title: 5,
          description: [
            'test',
            'test',
          ]
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.type.should.be.eql('error');
          res.body.message.should.be.eql('Invalid data');
          done();
        });
    });
  });

  describe('/PUT api/notes/id', () => {
    it('it should PUT notes data and return success message', (done) => {

      chai.request(url)
        .put(`/api/notes/${id}`)
        .set('content-type', 'application/json')
        .send(JSON.stringify(notesExamplePut))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.type.should.be.eql('success');
          res.body.message.should.be.eql('Notes have been updated!');
          done();
        });
    });

    it('it shouldn\'t PUT notes data (no exist ID) and return error 500', (done) => {

      chai.request(url)
        .put(`/api/notes/${123}`)
        .set('content-type', 'application/json')
        .send(JSON.stringify(notesExamplePut))
        .end((err, res) => {
          res.should.have.status(500);
          res.body.type.should.be.eql('error');
          res.body.message.should.be.eql('Something broke!');
          done();
        });
    });

    it('it shouldn\'t PUT notes data (color data Invalid) and return error 400', (done) => {

      notesExamplePut.color = 'rgb(204S, 255, 144)';

      chai.request(url)
        .put(`/api/notes/${id}`)
        .set('content-type', 'application/json')
        .send(JSON.stringify(notesExamplePut))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.type.should.be.eql('error');
          res.body.message.should.be.eql('Invalid data');
          done();
        });
    });
  });

  describe('/GET notes', () => {
    it('it should GET create notes page', (done) => {
      chai.request(url)
        .get('/notes')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should GET exist notes page', (done) => {
      chai.request(url)
        .get(`/notes/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should\'t GET, error 404 no exit page', (done) => {
      chai.request(url)
        .get('/no-exist-page')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('it should\'t GET, error 404 no exist notes page', (done) => {
      chai.request(url)
        .get('/notes/233434')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/DELETE notes', () => {
    it('it should DELETE exist notes', (done) => {
      chai.request(url)
        .delete(`/api/notes/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.type.should.be.eql('success');
          res.body.message.should.be.eql('Notes have been deleted!');
          done();
        });
    });


    it('it should DELETE error 500 no exist ID', (done) => {
      chai.request(url)
        .delete(`/api/notes/123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.type.should.be.eql('error');
          res.body.message.should.be.eql('Something broke!');
          done();
        });
    });
  });
});
