class Bookings {
  constructor(bookingsData) {
    this.bookingsData = bookingsData
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

  getRoomsByDate(date) {
    let availableRooms = this.bookingsData.filter(booking =>  booking.date === date)
    return availableRooms
  }

  getTotalRoomCosts(roomsArray) {
    let counter = 0
    roomsArray.forEach((room, index) => {
      counter += roomsArray.getCost(index)
    })
  }

}

module.exports = Bookings
