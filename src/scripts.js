// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getUsersApiData, getRoomsApiData, getBookingsApiData } from './apiCalls'
import UserRepo from '../src/classes/UserRepo.js'
import User from '../src/classes/User.js'
import Rooms from '../src/classes/UserRepo.js'
import Bookings from '../src/classes/Bookings.js'
//import all classes
//create userRepo class and tests

// global variables //
let userRepo
let currentUser
let users
let customers
let rooms
let bookings
let today
let errorMessage

// promises //
function getAllData() {
  Promise.all([getUsersApiData, getRoomsApiData, getBookingsApiData])
  .then(data => {
    customers = data[0].customers
    rooms = data[1].rooms
    bookings = data[2].bookings
    userRepo = new UserRepo(customers)
    currentUser = new User(customers[0])
    rooms = new Rooms(rooms)
    bookings = new Bookings(bookings)
    displayDashboard()
  })
}

// selectors //
const userNameDisplay = document.querySelector('h2')
const errorDisplay = document.querySelector('h1')
const bookingForm = document.querySelector('#booking-form')
const bookingCalendar = document.querySelector('.booking-calendar')
const submitButton = document.querySelector('#submit-button')
const availRooms = document.querySelector('.avail-rooms-container')

const upcomingVisitsContainer = document.querySelector('.upcoming-visits-container')
const pastVisitsContainer = document.querySelector('.past-visits-container')
const yourTotal = document.querySelector('.your-total')

// event listeners //
window.addEventListener('load', getAllData())
submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  console.log(bookingCalendar.value);
  console.log(selectRoomByDate(bookingCalendar.value))
})


// DOM manipulation //

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
  let availableRooms = bookings.getRoomsByDate(date)
  console.log('follow the data', availableRooms)
renderAvailRooms(availableRooms, event)
}

function renderAvailRooms(availableRooms) {
  availableRooms.forEach(room => {
    console.log('room:', room )
      availRooms.innerHTML += `
      <p>Check out room number ${booking.roomNumber} </p>
      `
    })
}



function displayError(errorMessage) {
  errorMessage = 'so sorry, something went wrong'
  errorDisplay.innerText = `Overlook is ${errorMessage}`
}
