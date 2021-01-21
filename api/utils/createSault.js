makeSalt = () => {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";
  let len = 15

  for (len; len > 0; len-- ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

module.exports = {

  makeSalt: makeSalt

}
