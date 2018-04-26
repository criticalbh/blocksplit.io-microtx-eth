const config = require("./config");

var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
const web3 = require("web3");
const Account = require("eth-lib/lib/account");
const sigUtil = require("eth-sig-util");

app.listen(8080);

const privateKey = "a29872505be884c291158a80a6b012a005beda6a637a679e6df462587e7f2ceb";

function handler(req, res) {
  fs.readFile(__dirname + "/index.html",
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading index.html");
      }

      res.writeHead(200);
      res.end(data);
    });
}

// console.log(web3);
const Web3 = new web3(new web3.providers.HttpProvider("https://rinkeby.infura.io/JjqQ76kOXunOy45px6vf"));
Web3.eth.accounts.wallet.add("0x" + privateKey);
Web3.eth.defaultAccount = "0x3C829B580210C44ce3816635160693CaFA62D31e";

const contract = new Web3.eth.Contract(config.contractAbi, config.contractAddress);

contract.methods.checkSignature(Web3.utils.toWei("0.02"), "0x1c", "0x196b2ea12c50aa93e30edc69f82658d9f16a01563c7d96036d657f642b0203da", "0x0d7472ddd9954f71764fd6b27faa55eb96d8151c46fef2b3bcf828ac93a0ecf7").call({
  from: "0x3C829B580210C44ce3816635160693CaFA62D31e",
}).then(response => {
  console.log(response);
});
// console.log(contract);

let lastReceipt;

io.on("connection", function (socket) {

  socket.on("buyitem", function (data) {
    if (!lastReceipt) {
      lastReceipt = [
        {
          type: "uint256",
          name: "NewBalance",
          value: data.item.toString(),
        },
      ];
    } else {
      const lastBalance = parseFloat(lastReceipt[0].value);
      lastReceipt = [
        {
          type: "uint256",
          name: "NewBalance",
          value: +data.item + lastBalance
        },
      ];
    }

    const privKey = Buffer.from(privateKey, "hex");

    const msgParams = {data: lastReceipt};

    const hash = sigUtil.typedSignatureHash(lastReceipt);

    const signature = sigUtil.signTypedData(privKey, msgParams);
    socket.emit("buyitemSuccess", {data: lastReceipt, signature: signature, hash: hash});
  });

  socket.on("withdraw", async function (data) {
    console.log("wihdrawing");
    await withdraw(lastReceipt);
  });
});

const withdraw = async (lastReceipt) => {
  const msgParams = {data: lastReceipt};


  const privKey = Buffer.from(privateKey, "hex");
  const signature = sigUtil.signTypedData(privKey, msgParams);

  const vrs = Account.decodeSignature(signature);
  const hash = sigUtil.typedSignatureHash(msgParams.data);


  console.log(hash, vrs[0], vrs[1], vrs[2], msgParams.data[0].value);

  contract.methods.WithdrawRestaurant(hash, vrs[0], vrs[1], vrs[2], msgParams.data[0].value).send({
    from: "0x3C829B580210C44ce3816635160693CaFA62D31e",
    gas: 41000,
    gasLimit: 89065,
    gasPrice: 1,
  }).then(response => {
    console.log(response);
  });
};