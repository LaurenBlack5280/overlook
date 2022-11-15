class Rooms {
  constructor(roomsData) {
    this.roomsData = roomsData
  }

  getARoom(num) {
    let room = this.roomsData[num - 1]
    return room
  }

  getRoomCost(num) {
    let cost = this.getARoom(num).costPerNight
    return cost
  }

//addbyType to function and variable names
  getRooms(type) {
    let filteredRooms = this.roomsData.filter(room =>  room.roomType === type)
    return filteredRooms
  }
  /*
    write a func that returns the cost of
    all bookings for that user
  */
}
module.exports = Rooms
