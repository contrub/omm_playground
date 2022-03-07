const whitelist = process.env.WHITELIST

function postman(origin, callback) {
  if (!origin) return callback(null, true);
  if (origin && origin.match(/chrome-extension/) && origin.match(/chrome-extension/).length) return callback(null, true);
  if (whitelist.indexOf(origin) === -1) {
    let message = "The CORS policy for this origin doesn't allow access from the particular origin.";
    return callback(new Error(message), false);
  }
  return callback(null, true);
}

module.exports = {
  postman: postman
}
