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

	function Withdraw(bytes32 hash, uint8 v, bytes32 r, bytes32 s, string value) public returns(address) {
        emit Poruka("asdasdasd");
		address signer;
		emit Hey(signer);
		bytes32 proof;


		signer = checkSignature(value, v, r, s);

		emit Hey(signer);

		// signature is invalid, throw
		if (signer != customer && signer != restaurantOwner) throw;

		proof = doHash(value);

		// signature is valid but doesn't match the data provided
		if (proof != hash) revert();

		if (signatures[proof] == 0)
			signatures[proof] = signer;
		else if (signatures[proof] != signer){
			// channel completed, both signatures provided
			if (!restaurantOwner.send(stringToUint(value))) revert();
			selfdestruct(customer);
		}

	}

	function doHash(string message) pure returns (bytes32) {
	  return keccak256(
        keccak256('string NewBalance'),
	    keccak256(message)
        );
	}

	function checkSignature(string message, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
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
