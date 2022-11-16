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
// add test for this function
  getRoomsByDate(date) {
    let availableRooms = this.bookingsData.filter(booking =>  booking.date === date)
    return availableRooms
  }

//what data am I passing in?
//what do I want to achieve?
//can I only pass in info for a single user
//

//pass in user bookings array
// iterate over that users array of bookings to get room number
//  find the assoc object to that room number within rooms array
//  then get cost costPerNight
// add to total

  getTotalRoomCosts(roomsArray) {
    let counter = 0
    roomsArray.forEach((room, index) => {
      counter += roomsArray.getCost(index)
    })
  }
  /*
    write a func that returns the cost of
    all bookings for that user
  */
}

module.exports = Bookings
