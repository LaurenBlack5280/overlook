class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData
    //this.singleUserBookings =
    this.pastBookings = []
    this.upcomingBookings = []
  }

  getSingleUserBookings(userID) {
    let singleUserBookings = this.bookingsData.filter(booking => booking.userID === userID)
    return singleUserBookings
  }

  formerOrLatterBookings(userID) {
    let today = new Date()
    let singleUserBookings = this.bookingsData.filter(booking => booking.userID === userID)
    singleUserBookings.forEach(booking => {
      let bookingDate = new Date(booking.date)
        if(today > bookingDate && !this.pastBookings.includes(booking)) {
        this.pastBookings.push(booking)
      }else if(today < bookingDate && !this.upcomingBookings.includes(booking)){
        this.upcomingBookings.push(booking)
      }
    })
    return singleUserBookings
  }

  // getBookingsTotal() {
  //   this.rooms.getRoomCost(19)
    // this.singleUserBookings = new Rooms(singleUserBookings)
    // console.log('hope', this.singleUserBookings)
    //for each booking number,
    // get cost per night
    //sum each cost per night
    //HOW
    //after we have each cost
    //reduce over costs
  }

  // getBookingsTotal(userID) {
  //   console.log(rooms.getRoomCost(1))
  //   let singleUserBookings = this.bookingsData.filter(booking =>  booking.userID === userID)
  //
  //   let listOfCosts = singleUserBookings.map(booking => {
  //     console.log('room number', booking.roomNumber)
  //     console.log(this.rooms.getRoomCost(booking.roomNumber))
  //   return
  //   })
  //   console.log('result', listOfCosts)
  //   return listOfCosts
  //   //return singleUserBookings
  // }

}

  /*
    write a func that returns the cost of
    all bookings for that user
  */

module.exports = Bookings
