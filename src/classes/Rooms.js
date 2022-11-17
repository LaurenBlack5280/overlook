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

  getRooms(type) {
    let filteredRooms = this.roomsData.filter(room =>  room.roomType === type)
    return filteredRooms
  }
}
module.exports = Rooms
