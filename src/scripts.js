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
    console.log('userRepo', userRepo)
    console.log('user', currentUser);
    displayDashboard()
  })
}

// selectors //
const userNameDisplay = document.querySelector('h2')
const errorDisplay = document.querySelector('h1')
const bookingForm = document.querySelector('#booking-form')
const bookingCalendar = document.querySelector('.booking-calendar')
const submitButton = document.querySelector('#submit-button')
const availRooms = document.querySelector('.avail-rooms')
const cardContainer = document.querySelector('.card-container')

// event listeners //
window.addEventListener('load', getAllData())
submitButton.addEventListener('click', function(event) {
  event.preventDefault()
  console.log(bookingCalendar.value);
  selectRoomByDate(bookingCalendar.value)
})


// DOM manipulation //

function getToday() {
  today = Date.now()
  return today
}

function displayDashboard() {
  userNameDisplay.innerHTML = `Welcome, ${currentUser.name}`
  // displayTotalCost()
  // displayUserBookings()
}


function selectRoomByDate(date) {
  console.log('hello')
  let availableRooms = bookings.getRoomsByDate(date)
renderAvailRooms(availableRooms)
}

function renderAvailRooms(availableRooms, event) {
  cardContainer.innerHTML = " "
  availableRooms.forEach(room => {
    cardContainer.innerHTML += `
          <article class="card">
            <section class="card-header">
              <h3>Room Name: ${room.roomType}</h3>
            </section>
            <section class="card-body">
              <p>
                <span>number: ${room.number} </span>
                <span>bidet: ${room.bidet} </span>
                <span>bedSize: ${room.bedSize} </span>
                <span>numBeds: ${room.numBeds} </span>
                <span>Price: ${room.costPerNight}</span>
              </p>
            </section>
          </article>`
        })
}
/*
Create new card for each room
1. create render card function that will
  create a new card article for each room
2.
*/

function addHidden(element) {
  element.classList.add("hidden");
}

function removeHidden(element) {
  element.classList.remove("hidden");
}
// function displayUserName() {
//   userNameDisplay.innerText = `Welcome ${currentUser.getName()}!`
// }

// function displayUserBookings() {
//   //change innerText
//   //or change innerHTML of
//   //main container
// }

// function displayTotalCost() {
//
// }

function displayError(errorMessage) {
  errorMessage = 'so sorry, something went wrong'
  errorDisplay.innerText = `Overlook is ${errorMessage}`
}
