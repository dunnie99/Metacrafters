// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Token {
    // Public variables
    string public name;
    string public symbol;
    uint256 public totalSupply;

    // Mapping of addresses to balances
    mapping(address => uint256) public balances;

    // Event for transfer
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Constructor to initialize the token details
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    // Mint function
    function mint(address _to, uint256 _value) public {
        require(_value > 0, "Value must be greater than 0");

        totalSupply += _value;
        balances[_to] += _value;

        emit Transfer(address(0), _to, _value);
    }

    // Burn function
    function burn(address _from, uint256 _value) public {
        require(_value > 0, "Value must be greater than 0");
        require(balances[_from] >= _value, "Insufficient balance");

        totalSupply -= _value;
        balances[_from] -= _value;

        emit Transfer(_from, address(0), _value);
    }
}
