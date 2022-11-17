import { expect } from "chai";
import Rooms from '../src/classes/Rooms.js'
import roomsData from '../src/sample-data.js/sample-rooms.js'

describe('Rooms', function() {
let rooms
  beforeEach(() => {
     rooms = new Rooms(roomsData)
  })

  it('should be a function', function() {
    expect(Rooms).to.be.a('function');
  });

  it('should store data for all rooms', function() {
    expect(rooms.roomsData[0]).to.deep.equal({ number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4 })
    expect(rooms.roomsData[1]).to.deep.equal({ number: 2, roomType: "suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 477.38 })
  })

  it('should return information for a single room by id', function() {
    expect(rooms.getARoom(1)).to.deep.equal(rooms.roomsData[0])
    expect(rooms.getARoom(2)).to.deep.equal(rooms.roomsData[1])
  })

  it('should return room cost by room number', function() {
    expect(rooms.getRoomCost(1)).to.equal(358.4)
    expect(rooms.getRoomCost(2)).to.equal(477.38)
  })

  it('should get rooms by type', function() {
      expect(rooms.getRooms("residential suite")).to.deep.equal([rooms.roomsData[0]])
    expect(rooms.getRooms("junior suite")).to.deep.equal([rooms.roomsData[5], rooms.roomsData[7]])
  } )


    // it('should calculate total cost of rooms', function() {
    //   expect(rooms.getBookingsTotal()).to.equal(866.35)
    //   expect(rooms.getBookingsTotal()).to.equal(1245.75)
    // })
})
