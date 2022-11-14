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
    today = Date.now()
    //displayDashboard()
  })
}

// selectors //
const userNameDisplay = document.querySelector('h2')
const errorDisplay = document.querySelector('h1')

// event listeners //
window.addEventListener('load', getAllData())

// helper functions //
//function displayDashboard() {
  // displayUserName()
  //displayTotalCost()
  //displayUserBookings()
// }

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
