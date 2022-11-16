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

  // getTotalCost() {
  //   return rooms.reduce((previous, currentRoom) => {
  //     previous += currentRoom.costPerNight
  //     return previous
  //   }, 0)
  // }
  /*
    write a func that returns the cost of
    all rooms for that user
  */
}
module.exports = Rooms
