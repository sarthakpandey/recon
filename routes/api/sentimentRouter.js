const path = require("path");
const { spawn } = require("child_process");

const router = require("express").Router();

function runScript() {
  return spawn("python", [path.join(__dirname, "myscript.py")]);
}

router.get("/", (req, res) => {
  const subprocess = runScript();
  subprocess.stdout.on("data", data => {
    console.log(data.toString());
  });
  // subprocess.stderr.on("close", () => {
  //   console.log("Closed");
  //   res.send("closed");
  // });
});

module.exports = router;
