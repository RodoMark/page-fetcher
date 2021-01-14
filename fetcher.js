const args = process.argv;
const URL = process.argv.slice(2).join("");

const readline = require("readline");
const request = require("request");
const net = require("net");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const site = request(URL, (error, response, body) => {
  if (error) {
    console.log("error:", error); // Print the error if one occurred
    return false;
  }

  console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  console.log("body:", body); // Print the HTML for the Google homepage.

  fs.writeFile("site.txt", body, (err) => {
    if (err) {
      console.error("Download failed.");
    } else if (`${body}.txt`) {
      const userOverwrite = rl.question(
        "File already exists. Would you like to overwrite it?",
        (answer) => {
          if (answer === "N" || answer === "N") {
            console.log("Download canceled");
            process.exit(1);
          } else {
            console.log("The file has been saved!");
          }
        }
      );
    } else console.log("The file has been saved!");
  });
});
