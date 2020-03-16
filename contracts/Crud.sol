pragma solidity ^0.5.0;

contract Crud {
  struct Car {
    uint id;
    string branding;
    string drivername;
    string phone;
    string driveraddress;
    string plat;
    string merk;
    uint datestart;
    uint dateend;
    string status;
  }
  Car[] public cars;
  uint public nextId = 1;

  function create(uint id, string memory branding, string memory drivername, string memory phone, string memory driveraddress, string memory plat, string memory merk, uint datestart, uint dateend, string memory status) public {
    cars.push(Car(nextId, branding, drivername, phone, driveraddress, plat, merk, datestart, dateend, status));
    nextId++;
  }

  function read(uint id) view public returns(string memory branding, string memory drivername, string memory phone,string memory driveraddress, string memory plat, string memory merk, uint datestart, uint dateend,string memory status) {
    uint i = find(id);
    return(cars[i].id, cars[i].branding, cars[i].drivername, cars[i].phone, cars[i].driveraddress, cars[i].plat, cars[i].merk, cars[i].datestart, cars[i].dateend, cars[i].status);
  }

  function update() public {
    uint i = find(id);
    users[i].status = status;
  }

  function destroy(uint id) public {
    uint i = find(id);
    delete cars[i];
  }

  function find(uint id) view internal returns(uint) {
    for(uint i = 0; i < users.length; i++) {
      if(cars[i].id == id) {
        return i;
      }
    }
    revert('Car does not exist!');
  }

}
