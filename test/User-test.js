import { expect } from "chai";
import User from '../src/classes/User.js'

describe('User', function() {
let userOne, userTwo
  beforeEach(() => {
    const user1 = {
    id: 1,
    name: "Leatha Ullrich"
    }

    const user2 = {
    id: 2,
    name: "Rocio Schuster"
    }

      userOne = new User(user1)
      userTwo = new User(user2)
  })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should have an id', function() {
    expect(userOne.id).to.equal(1);
    expect(userTwo.id).to.equal(2);
  });

  it('should have a name', function() {
    expect(userOne.name).to.equal('Leatha Ullrich');
    expect(userTwo.name).to.equal('Rocio Schuster');
  });

  it('should return user id', function() {
    expect(userOne.getUserID()).to.equal(1);
    expect(userTwo.getUserID()).to.equal(2);
  });

  it('should return user name', function() {
    expect(userOne.getName()).to.equal('Leatha Ullrich');
    expect(userTwo.getName()).to.equal('Rocio Schuster');
  });

});
