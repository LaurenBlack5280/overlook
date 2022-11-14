import { expect } from "chai";
import Bookings from '../src/classes/Bookings.js'
import User from '../src/classes/User.js'
import bookingsData from '../src/sample-data.js/sample-bookings.js'

describe('Bookings', function() {
let bookings, user1, user2, userOne, userTwo, today
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

  it('should contain past bookings', function() {
  bookings.formerOrLatterBookings(1)
    expect(bookings.pastBookings).to.deep.equal([
      {
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12
      },
      {
      id: "5fwrgu4i7k55hl727",
      userID: 1,
      date: "2022/11/06",
      roomNumber: 22
      }
    ])
    bookings.pastBookings = []
    bookings.formerOrLatterBookings(2)
    expect(bookings.pastBookings).to.deep.equal([])
  })

  it('should contain upcoming bookings', function() {
    bookings.formerOrLatterBookings(1)

    expect(bookings.upcomingBookings).to.deep.equal([
    {
    id: "5fwrgu4i7k55hl6x8",
    userID: 1,
    date: "2023/01/11",
    roomNumber: 20
    }
  ])

    bookings.upcomingBookings = []
    bookings.formerOrLatterBookings(2)
    expect(bookings.upcomingBookings).to.deep.equal([
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

  it('should calculate total cost of bookings' /* by room number???*/ , function() {
    expect(bookings.getBookingsTotal(1)).to.deep.equal()
    expect(bookings.getBookingsTotal(2)).to.deep.equal()
  })

})
