pragma solidity ^0.4.21;

contract Restaurant {

    address public customer;
	address public restaurantOwner;
	uint public startDate;
	mapping (bytes32 => address) public signatures;

	event Hey(address msg);
	event Poruka(string msg);

	function Deposit(address to) public payable {
		restaurantOwner = to;
		customer = msg.sender;
		startDate = now;
	}

	function test(string value) returns(uint){
	    uint val = stringToUint(value);
	    return val;
	}

	function WithdrawCustomer(bytes32 hash, uint8 v, bytes32 r, bytes32 s, uint256 value) public returns(address) {
		address signer;
		bytes32 proof;
		signer = checkSignature(value, v, r, s);

		if (signer != customer) throw;

		proof = doHash(value);

		if (proof != hash) revert();

		signatures[proof] = signer;
	}

	function WithdrawRestaurant(bytes32 hash, uint8 v, bytes32 r, bytes32 s, uint256 value) public returns(address) {
		address signer;
		bytes32 proof;
		signer = checkSignature(value, v, r, s);

		if (signer != restaurantOwner) throw;

		proof = doHash(value);

		if (proof != hash) revert();

		if (signatures[proof] == 0)
			throw;

		if (signatures[proof] != customer){
			if (!restaurantOwner.send(value)) revert();
			selfdestruct(customer);
		}
	}

	function doHash(uint256 message) pure returns (bytes32) {
	  return keccak256(
        keccak256('uint256 NewBalance'),
	    keccak256(message)
        );
	}

	function checkSignature(uint256 message, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        var hash = doHash(message);
        return ecrecover(hash, v, r, s);
	}


    function stringToUint(string s) constant returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

}
