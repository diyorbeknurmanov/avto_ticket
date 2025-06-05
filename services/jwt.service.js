const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: "15h",
    });

    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: "15d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

let jwtService = new JwtService(
  config.get("access_key"),
  config.get("refresh_key")
);

module.exports = {
  jwtService,
};
