const path = require("path");
const { spawn } = require("child_process");

const router = require("express").Router();

function runScript() {
  return spawn("python", ["-u", path.join(__dirname, "myscript.py")]);
}

router.get("/", (req, res) => {
  const subprocess = runScript();
  subprocess.stdout.on("data", data => {
    console.log(data);
    res.send(data);
  });
  subprocess.stderr.on("data", data => {
    console.log(`error:${data}`);
    res.send(data);
  });
  subprocess.stderr.on("close", () => {
    console.log("Closed");
    res.send("closed");
  });
});

module.exports = router;
