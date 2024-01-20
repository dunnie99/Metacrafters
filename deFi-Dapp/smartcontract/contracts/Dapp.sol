// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "./Org.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
// console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

contract factory {
    mapping(address => address) adminOrg;

    function createOrg(
        string memory tokenname,
        string memory tokensymbol
    ) public {
       Organization newOrganization = new Organization(
            tokenname,
            tokensymbol
        );
        adminOrg[msg.sender] = address(newOrganization);
    }

    function getOrganization(address newOwner) public view returns(address) {
        require(address(newOwner) != address(0), "address Zero");
        address org = adminOrg[newOwner];
        return org;
    }

    
}