const config = {
  contractAddress: "0x9c977da01a1b11985950ef63f3ca242093ac1e38",
  contractAbi: [{
    "constant": false,
    "inputs": [{"name": "hash", "type": "bytes32"}, {"name": "v", "type": "uint8"}, {
      "name": "r",
      "type": "bytes32",
    }, {"name": "s", "type": "bytes32"}, {"name": "value", "type": "uint256"}],
    "name": "WithdrawCustomer",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [],
    "name": "startDate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [{"name": "s", "type": "string"}],
    "name": "stringToUint",
    "outputs": [{"name": "result", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [{"name": "", "type": "bytes32"}],
    "name": "signatures",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [],
    "name": "customer",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [],
    "name": "restaurantOwner",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  }, {
    "constant": false,
    "inputs": [{"name": "hash", "type": "bytes32"}, {"name": "v", "type": "uint8"}, {
      "name": "r",
      "type": "bytes32",
    }, {"name": "s", "type": "bytes32"}, {"name": "value", "type": "uint256"}],
    "name": "WithdrawRestaurant",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  }, {
    "constant": false,
    "inputs": [{"name": "to", "type": "address"}],
    "name": "Deposit",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [{"name": "message", "type": "uint256"}, {"name": "v", "type": "uint8"}, {
      "name": "r",
      "type": "bytes32",
    }, {"name": "s", "type": "bytes32"}],
    "name": "checkSignature",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
  }, {
    "constant": true,
    "inputs": [{"name": "message", "type": "uint256"}],
    "name": "doHash",
    "outputs": [{"name": "", "type": "bytes32"}],
    "payable": false,
    "stateMutability": "pure",
    "type": "function",
  }, {
    "constant": false,
    "inputs": [{"name": "value", "type": "string"}],
    "name": "test",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "msg", "type": "address"}],
    "name": "Hey",
    "type": "event",
  }, {
    "anonymous": false,
    "inputs": [{"indexed": false, "name": "msg", "type": "string"}],
    "name": "Poruka",
    "type": "event",
  }],


};

module.exports = config;