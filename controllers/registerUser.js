const { userRegister } = require("../helper/userRegister");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      error: "Email Address cannot be empty",
    });
    return;
  }
  if (!password) {
    res.status(400).send({
      error: "Password cannot be empty",
    });
    return;
  }
  if (!req.file) {
    res.status(400).send({
      error: "No file has been selected or file doesn't have proper extension",
    });
    return;
  }
  const imagePath = "/upload/" + req.file.filename;
  await userRegister(email, password, imagePath);
  res.status(201).send({ success: true, mssg: "User registered successfully" });
};
module.exports = { registerController };
