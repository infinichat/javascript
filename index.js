import Crisp from "crisp-api";
import io from "socket.io-client";
import express from "express";
const app = express();
// const server = require("http").Server(app);

("use strict");

const TOKEN = {
  identifier: "5609c6ae-2281-45fe-b66f-01f3976a8fec",
  key: "3da36469d1da798b3b4ce23eae580637b0a308ea654c71d78cff08937604f191",
};

// var Crisp = require("../");
var CrispClient = new Crisp();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);
CrispClient.setRtmMode(Crisp.RTM_MODES.WebSockets);
const socket = io("http://167.99.243.140");

console.info("Listening for events...");

CrispClient.on("message:received", function (message) {
  console.info("[WebSockets] Got 'message:received' event:", message);
  console.info("Sending message to a client")
  socket.emit("send_message", message.content, message.session_id, message.fingerprint);
})
  .then(function () {
    console.error("[WebSockets] Requested to listen to sent messages");
  })
  .catch(function (error) {
    console.error("[WebSockets] Failed listening to sent messages:", error);
  });

CrispClient.on("message:updated", function (message) {
  console.info("[WebSockets] Got 'message:updated' event:", message);
  socket.emit("edit_message", message.content, message.fingerprint);
})
  .then(function () {
    console.error("[WebSockets] Requested to listen to sent messages");
  })
  .catch(function (error) {
    console.error("[WebSockets] Failed listening to sent messages:", error);
  });

CrispClient.on("message:removed", function (message) {
  console.info("[WebSockets] Got 'message:removed' event:", message);

  // Log the fingerprint or relevant content
  console.log(
    "[WebSockets] Fingerprint or relevant content:",
    message.fingerprint
  ); // Replace 'fingerprint' with the actual property name

  socket.emit("message_to_delete", message.fingerprint, message.session_id);

  // WebSocket.emit('delete_message', )
})
  .then(function () {
    console.error("[WebSockets] Requested to listen to received messages");
  })
  .catch(function (error) {
    console.error("[WebSockets] Failed listening to received messages:", error);
  });

app.listen(3000, () => console.log("Example app listening on port 3000!"));