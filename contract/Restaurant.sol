pragma solidity ^0.4.21;

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

	function doHash(string message) pure returns (bytes32) {
	  return keccak256(
        keccak256('string NewBalance'),
	    keccak256(message)
        );
	}

	function checkSignature(string message, bytes32 r, bytes32 s, uint8 v) public pure returns (address) {
        var hash = doHash(message);
        return ecrecover(hash, v, r, s);
	}

}



"0.01", "0xcea46a7c896530d32ba5101d584050374225a64f49223417b1468806e3dcee38", "0x1916c16e755c818fa006ee7031c3db16e8ae43424af9ad3cab99c6d8a111ea09", "0x1b"