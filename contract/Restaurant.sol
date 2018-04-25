pragma solidity ^0.4.0;

contract Restaurant {

    address public customer;
	address public restaurantOwner;
	uint public startDate;
	mapping (bytes32 => address) signatures;

	function Deposit(address to) public payable {
		restaurantOwner = to;
		customer = msg.sender;
		startDate = now;
	}
}
