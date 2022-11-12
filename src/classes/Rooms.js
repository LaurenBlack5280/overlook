class Rooms {
  constructor(roomsData) {
    this.roomsData = roomsData

  }

  getARoom(num) {
    let room = this.roomsData[num - 1]
    return room
  }

  getRooms(type) {
    let filteredRooms = this.roomsData.filter(room =>  room.roomType === type)
    return filteredRooms
    //return room
  }

}
module.exports = Rooms
