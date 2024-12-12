const express = require("express");
const path = require("path");
const os = require("os");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/forms", express.static(path.join(__dirname, "forms")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res) => {
  res.redirect("/");
});

const port = 3000;

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress = "";
  for (const interface in interfaces) {
    interfaces[interface].forEach((details) => {
      if (details.family === "IPv4" && !details.internal) {
        ipAddress = details.address;
      }
    });
  }
  return ipAddress;
};

const getServerURL = () => {
  const ipAddress = getIPAddress();
  return `http://${ipAddress}:${port}`;
};

app.listen(port, function () {
  console.log(`Server is up at port ${port}`);
  console.log(`Server IP address: ${getIPAddress()}`);
  console.log(`Server is up at: ${getServerURL()}`);
});
