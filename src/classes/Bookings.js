class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData
    //this.pastBookings = []
  }

  getSingleUserBookings(userID) {
    let singleUserBookings = this.bookingsData.filter(booking => {
    return booking.userID === userID
    })
    return singleUserBookings
  }

  getPastBookings(userID) {
    let singleUserBookings = this.bookingsData.filter(booking => {
    return booking.userID === userID
    })
    let datesInMilliseconds = singleUserBookings.map(booking => {
      
      console.log(booking.date)
      return booking.date
    })
    return datesInMilliseconds
    //change all dates to milliseconds with
    //date.getMilliseconds()
    //compare to date.now(currentDate)
    //return singleUserBookings
  }

  // getPastBookings(userID) {
  //    this.getSingleUserBookings(userId).filter(booking => {
  //     return booking.date < today
  //   })
    //iterate through bookingsData
    //access date property
    //if date is less than today,
    //date is a string
    //turn it into a num to compare?
    //turn back into string

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



module.exports = Bookings
