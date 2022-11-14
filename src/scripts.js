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
    console.log(data)
    customers = data[0].customers
    console.log(customers)
    rooms = data[1].rooms
    bookings = data[2].bookings
    customers = users
    userRepo = new UserRepo(users)

    //currentUser = new User(userRepo[Math.floor(Math.random() * userRepo.length)])
    //console.log('current user', currentUser)
    rooms = new Rooms(rooms)
    bookings = new Bookings(bookings)
    //displayDashboard()
  })
}

// selectors //
const userNameDisplay = document.querySelector('h2')
const errorDisplay = document.querySelector('h1')
const bookingForm = document.querySelector('#booking-form')
const bookingCalendar = document.querySelector('#booking-calendar')
const submitButton = document.querySelector('#submit-button')
// event listeners //
window.addEventListener('load', getAllData())
//bookingCalendar.addEventListener('load', displayTodaysDate)
submitButton.addEventListener('click', selectDate)
// helper functions //
function getToday() {
  today = Date.now()
  return today
}
//function displayDashboard() {
  // displayUserName()
  //displayTotalCost()
  //displayUserBookings()
// }
// function displayTodaysDate() {
//   getToday()
// }
//How to set date on calendar input to today?
  //change innerText
// select a date from calendar for booking
function selectRoomByDate(e) {
  bookingForm.textContent = e.target.value

  //date must be in future
  //must have available Rooms

}

// DOM manipulation //
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
  //add conditional logic for diff
  //errorMessage to appear
  //'Sorry, we can't find any rooms
  // that match your request
}
