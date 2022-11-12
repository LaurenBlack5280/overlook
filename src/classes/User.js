class User {
  constructor(userData) {
    this.id = userData.id
    this.name = userData.name
  }

  getUserID() {
    return this.id
  }

  getName(){
    return this.name
  }


}
module.exports = User
