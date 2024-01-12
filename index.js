// <previous code eluded>
// import io from "socket.io-client";
// // Fetch the RTM API endpoint from the REST API, and parse it as an URL
// // Important: replace '<endpoint-url>' with your dynamically-fetched URL
// let _endpoint = new URL(
//   "https://api.crisp.chat/v1/website/84ca425b-3cf3-4a00-836c-1212d36eba0c/conversation/session_d7cf3d0d-6d33-4bc1-b270-bc5371bcfcac/messages"
// );

// // Create client
// let _client = new io(_endpoint.origin, {
//   path: _endpoint.pathname || "/",
//   transports: ["websocket"],
// });

// // Handle client events
// _client.on("connect", () => {
//   console.log("RTM API connected");
// });

// _client.on("disconnect", () => {
//   console.log("RTM API disconnected");
// });

// _client.on("connect_error", (error) => {
//   console.error("RTM API connection error", error);
// });

// // Handle IO events
// _client.io.on("reconnect", () => {
//   console.log("RTM API reconnecting...");
// });

// _client.io.on("error", (error) => {
//   console.error("RTM API error", error);
// });
// ES module syntax to import the 'crisp-api' module
import Crisp from "crisp-api";
import io from "socket.io-client";
// var CrispClient = new Crisp();
// var identifier = "5609c6ae-2281-45fe-b66f-01f3976a8fec";
// var key = "3da36469d1da798b3b4ce23eae580637b0a308ea654c71d78cff08937604f191";
// var websiteID = "84ca425b-3cf3-4a00-836c-1212d36eba0c"

// CrispClient.authenticateTier("plugin", identifier, key);

/*
 * node-crisp-api
 *
 * Copyright 2022, Crisp IM SAS
 * Author: Baptiste Jamin <baptiste@crisp.chat>
 */

("use strict");

const TOKEN = {
  identifier: "5609c6ae-2281-45fe-b66f-01f3976a8fec",
  key: "3da36469d1da798b3b4ce23eae580637b0a308ea654c71d78cff08937604f191",
};

// var Crisp = require("../");
var CrispClient = new Crisp();

console.info("Authenticating...");

CrispClient.authenticateTier("plugin", TOKEN.identifier, TOKEN.key);
CrispClient.setRtmMode(Crisp.RTM_MODES.WebSockets);
const socket = io("http://127.0.0.1:5000");

console.info("Listening for events...");

CrispClient.on("message:received", function (message) {
  console.info("[WebSockets] Got 'message:received' event:", message);
  socket.emit("send_message", message.content, message.session_id);
})
  .then(function () {
    console.error("[WebSockets] Requested to listen to sent messages");
  })
  .catch(function (error) {
    console.error("[WebSockets] Failed listening to sent messages:", error);
  });

// CrispClient.on("message:send", function (message) {
//   console.info("[WebSockets] Got 'message:send' event:", message);
// })
//   .then(function () {
//     console.error("[WebSockets] Requested to listen to sent messages");
//   })
//   .catch(function (error) {
//     console.error("[WebSockets] Failed listening to sent messages:", error);
//   });

// CrispClient.on("message:updated", function (message) {
//   console.info("[WebSockets] Got 'message:updated' event:", message);
//   socket.emit("edit_message", message.content, message.fingerprint);
// })
//   .then(function () {
//     console.error("[WebSockets] Requested to listen to sent messages");
//   })
//   .catch(function (error) {
//     console.error("[WebSockets] Failed listening to sent messages:", error);
//   });

// CrispClient.on("message:removed", function (message) {
//   console.info("[WebSockets] Got 'message:removed' event:", message);

//   // Log the fingerprint or relevant content
//   console.log(
//     "[WebSockets] Fingerprint or relevant content:",
//     message.fingerprint
//   ); // Replace 'fingerprint' with the actual property name

//   socket.emit("message_to_delete", message.fingerprint);

//   // WebSocket.emit('delete_message', )
// })
//   .then(function () {
//     console.error("[WebSockets] Requested to listen to received messages");
//   })
//   .catch(function (error) {
//     console.error("[WebSockets] Failed listening to received messages:", error);
//   });
