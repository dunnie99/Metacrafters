# Organization Contract Overview

The Organization contract is a token management system on the Ethereum blockchain, specifically designed for ERC-20 tokens. It provides functionalities for adding stakeholders, managing user roles, register users for vesting, whitelisting users and withdrawing vested tokens. This guide will walk you through the steps to use the Organization contract.

### Set up Hardhat Environment
To begin setting up the Hardhat environment for your smart contract implementation, you will first need to create a new folder on your system. You can do this by using the ‘mkdir’ command in your terminal followed by the desired name of your folder. For example:
```
mkdir OrgDapp

cd OrgDapp

code .
```

To create this contract, we'll need to generate two files by following this step accordingly to clone the project:
```
$ git clone https://github.com/dunnie99/Metacrafters/tree/main/deFi-Dapp.git

run: 

$ npm install 

(to install necessary dependencies)
```

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

### Deployment of the Contract
The first step is to deploy the contract on the Ethereum blockchain. The account that deploys the contract becomes the admin of the contract.

- **Parameters**

    **_name:** _name represents the name of the ERC20 token that will be deployed as part of the Organization contract.

    **_symbol:** _symbol represents the symbol of the ERC20 token that will be deployed as part of the Organization contract.

    **_tokenVested:** _tokenVested represents the address of the token that will be vested for the users in the Organization contract.

    **_admin:** _admin represents the address of the admin of the Organization contract.

**2. Adding Stakeholders**

Once the contract is deployed, stakeholders can be added using the addStakeholder function. This function requires three parameters:

```
_holder: The address of the stakeholder.

_vestingPeriod: The time period for which the stakeholder's tokens are locked.

_minimalAmount: The minimum amount of tokens the stakeholder must hold.
```

**3. Managing User Roles and Whitelisting**

The UserInfo mapping is used to manage user roles and whitelisting. Each user has the following properties:

```
role: The role of the user.

isWhitelisted: A boolean indicating whether the user is whitelisted.

investedAmount: The amount of tokens the user has invested.

startTime: The time when the user started investing.

withdrawalTimestamp: The time when the user can withdraw their tokens.

The admin can update the role and isWhitelisted status of a user.
```

**4. Token Transfers**

Token transfers are handled using the approve and allowance functions:

The approve function allows another user (the spender) to withdraw up to a certain amount of tokens from the caller's account.
The allowance function checks the amount of tokens that an owner allowed to a spender.

**5. Events**

The contract emits events when certain actions are taken. These events can be listened for to react to changes in the contract state. The events are memberAdded, vestedReturned, and Owner.

# Factory Contract Overview

TThe primary goal of the factory contract is to create new instances of the Organization contract. Each instance represents a new organization with its own token name, token symbol, token address, and admin address.

### Factory Contract Usage Guide

```This guide is intended for technical operators or developers who want to understand how to use the factory contract. The factory contract is designed to create new instances of the Organization contract.```


### Steps to Use the Factory Contract

**Deploy the Factory Contract**: The first step is to deploy the factory contract on the Ethereum network. You can use a development framework like Truffle or Hardhat for this purpose.

**Call the createOrg Function**: After deploying the factory contract, you can call the createOrg function to create a new instance of the Organization contract. The createOrg function takes four arguments:

- tokenname: The name of the token for the new organization.

- tokensymbol: The symbol of the token for the new organization.

- _token: The address of the token for the new organization.

- _admin: The address of the admin for the new organization. This must be the address of the sender (msg.sender).

**Store the New Organization's Address**: The createOrg function returns the address of the new Organization contract. This address is also stored in the adminOrg mapping in the factory contract, with the admin's address as the key.

****Call the getOrganization Function**: You can call the getOrganization function with the admin's address to get the address of the Organization contract.

### Multiple Usage Scenarios

**Creating Multiple Organizations**: The factory contract can be used to create multiple organizations. Each time the createOrg function is called, a new Organization contract is created and its address is stored in the adminOrg mapping with the admin's address as the key.

**Getting the Address of an Organization**: The getOrganization function can be used to get the address of an Organization contract. This function takes the admin's address as an argument and returns the address of the Organization contract.

## Authors

 Oluwadunnie Rachael 
 [@LaDunnie99](https://twitter.com/LaDunnie99)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
