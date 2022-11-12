class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData
  }

  getSingleUserBookings(userID) {

    // user.getUserID()
    // //for each booking,
    let singleUserBookings = this.bookingsData.filter(booking => {
    return booking.userID === userID

    })
    return singleUserBookings
    //if user.id property equals
    //bookingsData userID property
    //return all bookings for that user

  }
  /*
  write a func that returns all bookings for that user
    then divides those stays into past
    and present
    How to determine past from present?
    1. set a date for today

  write a func that returns the cost of
    all bookings for that user
  */
}

module.exports = Bookings
