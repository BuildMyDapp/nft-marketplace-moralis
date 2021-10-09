pragma solidity ^0.8.0;

contract binanceTest {
    string public name;
    uint8 public age;
    
    function setBio(string memory myName, uint8 myAge) public {
        name = myName;
        age = myAge;
    }
    
    function getBio() public view returns(string memory, uint8) {
        
        return (name , age);
    }
}
