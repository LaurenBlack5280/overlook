const getUsersApiData =
fetch('http://localhost:3001/api/v1/customers/')
.then(res => {
  console.log('response:', res)
  if(!res.ok){
    throw new Error(errorMessage)
  }
  return res.json()
})
.catch(err => {
  console.log('error:', err)
  //displayError(errorMessage)
})

const getRoomsApiData =
fetch('http://localhost:3001/api/v1/rooms/')
.then(res => {
  console.log('response:', res)
  if(!res.ok){
    throw new Error(errorMessage)
  }
  return res.json()
})
.catch(err => {
  console.log('error:', err)
  //displayError(errorMessage)
})

const getBookingsApiData =
fetch('http://localhost:3001/api/v1/bookings/')
.then(res => {
  console.log('response:', res)
  if(!res.ok){
    throw new Error(res.statusText)
  }
  return res.json()
})
.catch(err => {
  console.log('error:', err)
  //displayError(errorMessage)
})

const postBookingApiData =
function postData(booking) {
  let postedData = fetch('http://localhost:3001/api/v1/bookings/', {
    method: 'POST',
    body: JSON.stringify(booking),
    headers: { 'content-type': 'application/json'}
  })
  .then(res => {
    console.log('response:', res)
    if(!res.ok){
      throw new Error(res.statusText)
    }
    return res.json()
    })
    .catch(err => {
      console.log('error:', err)
      //displayError(errorMessage)
    })
  return postedData
}

export { getUsersApiData, getRoomsApiData, getBookingsApiData, postBookingApiData }
