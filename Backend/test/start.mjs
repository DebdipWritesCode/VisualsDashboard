import { expect } from 'chai';
import request from 'supertest';
import index from '../index.js'; // Assuming your Express app is exported from app.js

describe('Graph API Tests', function() {
  
  it('should throw an error if the Authorization header is not present', function(done) {
    request(index)
      .get('/graph') // Replace with your endpoint path
      .expect(401) // Assuming you expect a 401 Unauthorized status
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body.error).to.equal('Authorization header is missing');
        done();
      });
  });

});
