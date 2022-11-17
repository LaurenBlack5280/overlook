import './css/styles.css';
import './images/turing-logo.png'
import { getUsersApiData, getRoomsApiData, getBookingsApiData, postBookingApiData } from './apiCalls'
import UserRepo from '../src/classes/UserRepo.js'
import User from '../src/classes/User.js'
import Rooms from '../src/classes/UserRepo.js'
import Bookings from '../src/classes/Bookings.js'

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
  selectRoomByDate(bookingCalendar.value)
})
loginSubmitButton.addEventListener('click', handleLogin)
bookVisitButton.addEventListener('click', handleBooking)

// DOM manipulation //
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

function selectRoomByDate(date) {
  let availableRooms = filterRoomsByDate(date)
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
      unAvailableRooms.push(booking)
    }
  })
return getAvailableRooms(unAvailableRooms)

}

function getAvailableRooms(unAvailableRooms) {
  let availableRooms = []
  rooms.userData.map(room => {
    let foundRoom = unAvailableRooms.find(booking => {
        return booking.roomNumber === room.number
    })
    if(!foundRoom) {
      availableRooms.push(room)
    }
  })
  return availableRooms
}

function displayError(errorMessage) {
  errorMessage = 'so sorry, something went wrong'
  errorDisplay.innerText = `Overlook is ${errorMessage}`
}
