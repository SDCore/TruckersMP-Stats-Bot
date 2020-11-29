const fs = require("fs");
const axios = require("axios"); // Load http server for communicating with the API
const moment = require("moment");

function pingServers() {
  // Ping the API for server data
  console.log("Pinging Server API, please wait...");
  axios
    .get("https://api.truckersmp.com/v2/servers")
    .then((res) => {
      // If the response is valid
      if (res.data) {
        var jsonresponse = JSON.stringify(res.data);
        // Write data in 'Output.txt' .
        fs.writeFile(
          "servers.json",
          jsonresponse.slice(0, -1) +
            ', "updateTime" : "' +
            moment().format() +
            '"}',
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
        console.log(
          `[${moment().format("hh:mm:s")}] Logged server json response`
        );
      } else {
        console.log(
          "Could not fetch data from server API, the server may be down."
        );
      }
    })
    .catch(
      (err) =>
        console.log(
          "Error pinging the server API for data: ",
          err,
          " Sorry! Bots should be set to DND shortly."
        ),
      fs.writeFile("servers.json", '{"error" : "true"}', (err) => {
        if (err) throw err;
      })
    );
}

function pingVersion() {
  // Ping the API for version info
  console.log("Pinging Version API, please wait...");
  axios
    .get("https://api.truckersmp.com/v2/version")
    .then((res) => {
      // If the response is valid
      if (res.data) {
        var jsonresponse = JSON.stringify(res.data);
        // Write data in 'Output.txt' .
        fs.writeFile(
          "version.json",
          jsonresponse.slice(0, -1) +
            ', "updateTime" : "' +
            moment().format() +
            '"}',
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
        console.log(
          `[${moment().format("hh:mm:s")}] Logged version json response`
        );
      } else {
        console.log(
          "Could not fetch data from version API, the server may be down."
        );
      }
    })
    .catch(
      (err) =>
        console.log(
          "Error pinging the version API for data: ",
          err,
          " Sorry! Bots should be set to DND shortly."
        ),
      fs.writeFile("version.json", '{"error" : "true"}', (err) => {
        if (err) throw err;
      })
    );
}

pingServers();
pingVersion();

setInterval(function () {
  var date = new Date();

  if (date.getMinutes() % 2.5 == 0) {
    pingServers();
    pingVersion();
  }
}, Math.max(1, 1) * 60 * 1000);
