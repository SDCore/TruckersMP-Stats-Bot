const fs = require("fs");
const axios = require("axios"); // Load http server for communicating with the API
const moment = require("moment");

function pingPlayerCount() {
  // Ping the API for server data
  console.log("Pinging API, please wait...");
  axios
    .get("https://api.truckersmp.com/v2/servers")
    .then((res) => {
      // If the response is valid
      if (res.data) {
        var jsonresponse = JSON.stringify(res.data);
        // Write data in 'Output.txt' .
        fs.writeFile(
          "apiOutput.json",
          jsonresponse.slice(0, -1) +
            ', "updateTime" : "' +
            moment().format() +
            '"}',
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
        console.log(`[${moment().format("hh:mm:s")}] Logged json response`);
      } else {
        console.log("Could not fetch data from API, the server may be down.");
      }
    })
    .catch(
      (err) =>
        console.log(
          "Error pinging the API for data: ",
          err,
          " Sorry! Bots should be set to DND shortly."
        ),
      fs.writeFile("apiOutput.json", '{"error" : "true"}', (err) => {
        if (err) throw err;
      })
    );
}

pingPlayerCount();

setInterval(function () {
  var date = new Date();

  if (date.getMinutes() % 2.5 == 0) {
    pingPlayerCount();
  }
}, Math.max(1, 1) * 60 * 1000);
