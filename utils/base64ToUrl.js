const { v4: uuidv4 } = require("uuid");

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const base64ToUrl = (base64) => {
  var base64Data = base64.replace(/^data:image\/jpeg;base64,/, "");
  const filename = uuidv4() + ".jpeg";
  const path = "upload/" + filename;
  require("fs").writeFileSync(path, base64Data, {encoding: 'base64'});
  const url = `http://localhost:${process.env.PORT}/upload/${filename}`;
  return url;
};

module.exports = { base64ToUrl };
