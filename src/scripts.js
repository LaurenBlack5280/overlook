// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getUsersApiData, getRoomsApiData, getBookingsApiData, postBookingApiData } from './apiCalls'
import UserRepo from '../src/classes/UserRepo.js'
import User from '../src/classes/User.js'
import Rooms from '../src/classes/UserRepo.js'
import Bookings from '../src/classes/Bookings.js'
//import all classes
//create userRepo class and tests

// global variables //
let userRepo
let customerID
let currentUser
let users
let customers
let rooms
let bookings
let today
let availableRooms
let errorMessage

// promises //
function getAllData() {
  Promise.all([getUsersApiData, getRoomsApiData, getBookingsApiData])
  .then(data => {
    customers = data[0].customers
    rooms = data[1].rooms
    bookings = data[2].bookings
    let loggedInUser = customers.find(customer => customer.id === parseInt(customerID))
    console.log(loggedInUser)
    userRepo = new UserRepo(customers)
    currentUser = new User(loggedInUser)
    rooms = new Rooms(rooms)
    bookings = new Bookings(bookings)
    displayDashboard()
    submitButton.disabled = false
  })

}

// selectors //
const userNameDisplay = document.querySelector('h2')
const errorDisplay = document.querySelector('h1')
const bookingForm = document.querySelector('#booking-form')
const bookingCalendar = document.querySelector('.booking-calendar')
const submitButton = document.querySelector('#submit-button')
let availRooms = document.querySelector('.avail-rooms-container')

const upcomingVisitsContainer = document.querySelector('.upcoming-visits-container')
const pastVisitsContainer = document.querySelector('.past-visits-container')
const yourTotal = document.querySelector('.your-total')
const loginUsername = document.querySelector('.login-username')
const loginPassword = document.querySelector('.login-password')
const loginSubmitButton = document.querySelector('#login-submit-button')
const bookVisitButton = document.querySelector("#book-visit-button")

// event listeners //
//window.addEventListener('load', getAllData())
submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  console.log(bookingCalendar.value);
  console.log(selectRoomByDate(bookingCalendar.value))
})
loginSubmitButton.addEventListener('click', handleLogin)
bookVisitButton.addEventListener('click', handleBooking)

// DOM manipulation //
/*
{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }
*/
function handleBooking() {
  let selectedRoom
  let selectedDate = bookingCalendar.value.replaceAll('-', '/')
  let radioButtons = document.querySelectorAll('.radio-buttons')
 radioButtons.forEach(button => {
   if(button.checked) {
     selectedRoom = button.name
   }
 })
 let selectedBooking = {
   userID: parseInt(customerID),
   date: selectedDate,
   roomNumber: parseInt(selectedRoom)
 }
 postBookingApiData(selectedBooking)
 .then(res => {
   bookings.bookingsData.push(res.newBooking)
   displayDashboard()
   selectRoomByDate(bookingCalendar.value)
 })
}

function handleLogin() {
  if(loginPassword.value !== 'overlook2021') {
    return
  }
  customerID = loginUsername.value.substring(8, 10)
  getAllData()
}

function getToday() {
  today = Date.now()
  return today
}

function displayDashboard() {
  userNameDisplay.innerHTML = `Welcome, ${currentUser.name}`
  displayUserBookings()
  displayTotalCost()
}

function displayUserBookings() {
  bookings.formerOrLatterBookings(currentUser.id)
  bookings.upcomingBookings.forEach(booking => {
    upcomingVisitsContainer.innerHTML += `
    <p>You will sleep in room ${booking.roomNumber} on
    ${booking.date}</p>
    `
  })
  bookings.pastBookings.forEach(booking => {
    pastVisitsContainer.innerHTML += `
    <p>You slept in room ${booking.roomNumber} on
    ${booking.date}</p>
    `
  })
}


// function getTotalCost() {
//   let userBookings = bookings.getSingleUserBookings(currentUser.id)
//   console.log('user bookings', userBookings)
//   let totalCost = bookings.getTotalRoomCosts(userBookings)
// }

  // let total = 0
  // let filteredRooms = rooms.filter(room => {
  //      return room.number
  //     // === userBookings.roomNumber
  // })
  // console.log(filteredRooms)
  // return filteredRooms
  // userBookings.forEach(booking => {
  //   console.log(rooms.getRoomCost(booking.roomNumber))
  //   console.log(booking.roomNumber)
  //   console.log('rooms', rooms)
     //total += room.costPerNight
  // })
  // //console.log('total', total)
  // return total
//}

function displayTotalCost() {
  //getTotalCost()
}
  //for each booking,
  //  get room number

  // let total = userBookings.reduce((previous, currentRoom) => {
  //   return previous += currentRoom.costPerNight
  // }, 0)
  // console.log(total)
  // return total
  // let total = rooms.getTotalCost()
  // console.log(total)


function selectRoomByDate(date) {
  console.log(date)
  let availableRooms = filterRoomsByDate(date)

  //let availableRooms = bookings.getRoomsByDate(date)
  console.log('follow the data', availableRooms)
renderAvailRooms(availableRooms, event)
return availableRooms
}

function renderAvailRooms(availableRooms) {
  availRooms.innerHTML = ""
  availableRooms.forEach(room => {

      availRooms.innerHTML += `
      <div>
        <input type="radio" class="radio-buttons" id="room-number-${room.number}" name="${room.number}" value="room-number-${room.number}" />
        <label for="room-number-${room.number}">
          Check out room number ${room.number}! It's
          our ${room.roomType} and has ${room.numBeds} bed(s)
        </label>
      </div>
      `
    })
}

function filterRoomsByDate(date) {
let editedDate = date.replaceAll("-", "/")
let  unAvailableRooms = []
    bookings.bookingsData.forEach(booking => {

    if(booking.date == editedDate) {
      console.log('bookings', bookings)
      unAvailableRooms.push(booking)
    }
  })
return getAvailableRooms(unAvailableRooms)

}

function getAvailableRooms(unAvailableRooms) {
  let availableRooms = []
  //console.log('rooms:', rooms)
  rooms.userData.map(room => {
    let foundRoom = unAvailableRooms.find(booking => {
        return booking.roomNumber === room.number
    })
    //console.log('foundRoom', foundRoom)
    if(!foundRoom) {
      availableRooms.push(room)
    }
  })
  //console.log(availableRooms)
  return availableRooms
}

//iterate through all rooms, filter out any rooms included
// unAvailableRooms list
// return available rooms to be displayed
//next, change display so user can select from list of
  //available rooms
//  and selected by user
//    make selections required
//  selecting room will fire post request

function displayError(errorMessage) {
  errorMessage = 'so sorry, something went wrong'
  errorDisplay.innerText = `Overlook is ${errorMessage}`
}
