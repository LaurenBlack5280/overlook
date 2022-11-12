import { expect } from "chai";
import Bookings from '../src/classes/Bookings.js'
import User from '../src/classes/User.js'
import bookingsData from '../src/sample-data.js/sample-bookings.js'

describe('Bookings', function() {
let bookings, user1, user2, userOne, userTwo
  beforeEach(() => {
     bookings = new Bookings(bookingsData)

     user1 = {
     id: 1,
     name: "Leatha Ullrich"
     }
     user2 = {
     id: 2,
     name: "Rocio Schuster"
     }

     userOne = new User(user1)
     userTwo = new User(user2)
  })

  it('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it('should contain all bookings', function() {
    expect(bookings.bookingsData[0]).to.deep.equal({
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12
    })
    expect(bookings.bookingsData[1]).to.deep.equal({
      id: "5fwrgu4i7k55hl6x8",
      userID: 1,
      date: "2023/01/11",
      roomNumber: 20
    })
  })
//console.log(userOne.getSingleUserBookings())
  it('should get all bookings for single user', function() {
    expect(bookings.getSingleUserBookings(1)).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12
      },
      {
      id: "5fwrgu4i7k55hl6x8",
      userID: 1,
      date: "2023/01/11",
      roomNumber: 20
      },
      {
      id: "5fwrgu4i7k55hl727",
      userID: 1,
      date: "2022/11/06",
      roomNumber: 22
      }
    ])
    expect(bookings.getSingleUserBookings(2)).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6uf",
      userID: 2,
      date: "2023/01/09",
      roomNumber: 18
      },
      {
      id: "5fwrgu4i7k55hl6uy",
      userID: 2,
      date: "2023/01/24",
      roomNumber: 19
      },
      {
      id: "5fwrgu4i7k55hl6uy",
      userID: 2,
      date: "2023/01/24",
      roomNumber: 19
      }
    ])
  })

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
