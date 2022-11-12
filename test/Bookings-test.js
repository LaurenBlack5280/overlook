import { expect } from "chai";
import Bookings from '../src/classes/Bookings.js'
import bookingsData from '../src/sample-data.js/sample-bookings.js'

describe('Bookings', function() {
let bookings
  beforeEach(() => {
     bookings = new Bookings(bookingsData)
  })

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });


  it.skip('should return past bookings', function() {
    expect().to.deep.equal()
    expect().to.deep.equal()
  })

  it.skip('should return upcoming bookings', function() {
    expect().to.deep.equal()
    expect().to.deep.equal()
  })

  it.skip('should calculate total cost of bookings', function() {
    expect().to.deep.equal()
    expect().to.deep.equal()
  })

})
