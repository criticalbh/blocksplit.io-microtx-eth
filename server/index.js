var app = require("http").createServer(handler);
var io = require("socket.io")(app);
var fs = require("fs");
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

let lastReceipt;

io.on("connection", function (socket) {

  socket.on("buyitem", function (data) {
    if (!lastReceipt) {
      lastReceipt = [
        {
          type: "string",
          name: "NewBalance",
          value: data.item.toString(),
        },
      ];
    } else {
      const lastBalance = parseFloat(lastReceipt[0].value);
      lastReceipt = [
        {
          type: "string",
          name: "NewBalance",
          value: (+data.item + lastBalance).toString(),
        },
      ];
    }

    const privKey = Buffer.from(privateKey, "hex");

    const msgParams = {data: lastReceipt};

    const hash = sigUtil.typedSignatureHash(lastReceipt);

    const signature = sigUtil.signTypedData(privKey, msgParams);
    socket.emit("buyitemSuccess", {data: lastReceipt, signature: signature, hash: hash});
  });
});
