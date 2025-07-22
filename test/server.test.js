const request = require('supertest');
const app = require('../server');

describe('Song API', function() {
  it('returns TV Girl songs', function(done) {
    request(app)
      .get('/api/songs/tvgirl')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        if (!Array.isArray(res.body.songs)) {
          throw new Error('songs should be array');
        }
      })
      .end(done);
  });

  it('returns Smiths songs', function(done) {
    request(app)
      .get('/api/songs/smiths')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        if (!Array.isArray(res.body.songs)) {
          throw new Error('songs should be array');
        }
      })
      .end(done);
  });
});
