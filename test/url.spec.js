const expect = require('chai').expect
const Url = require('../models/url')

describe('Url', () => {
  it('should be invalid if originalUrl or shortUrl is empty', (done) => {
    const url = new Url()

    url.validate((err) => {
      expect(err.errors.originalUrl).to.exist
      expect(err.errors.shortUrl).to.exist
      done()
    })
  })
})
