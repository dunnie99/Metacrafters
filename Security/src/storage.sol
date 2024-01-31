// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StorageVictim {

   address immutable owner;
   
   struct Storage {
   
       address user;
       uint amount;
   }

   mapping(address => Storage) storages;

   constructor() {
   
       owner = msg.sender;
   }

   function store(uint _amount) public { 
   
       // Initialized storage reference to avoid pointing to a random storage slot.
       address user = msg.sender;
       
       Storage storage str = storages[user];
       
       str.user = user;
       
       str.amount = _amount;

   }
   function getStore() public view returns (address, uint) {
       
       Storage memory str = storages[msg.sender];
       
       return (str.user, str.amount);
   }
   
   function getOwner() public view returns (address) {
       
       return owner;
   }
}