const jwt = require("jsonwebtoken");

AccessToken = (payload, res) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFE || 3600
    }, (err, token) => {
      if (err) {
        return res.status(401).send('Unauthorised');
      }

      res.send({
        success: true,
        accessToken: `Bearer ${token}`,
      });
    });
};

RefreshToken = (payload, res) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFE || 3600
    }, (err, token) => {
      if (err) {
        return res.status(401).send('Unauthorised');
      }
      res.send({
        success: true,
        accessToken: `Bearer ${token}`,
      });
    });
};


module.exports = {

  AccessToken: AccessToken,
  RefreshToken: RefreshToken

}
