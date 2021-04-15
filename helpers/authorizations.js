const JWT = require("jsonwebtoken");
const User = require("../models/user");

module.exports.userAuthorization = async (req, res, next) => {
  try {
    if (req.headers.authorization && `${req.headers.authorization}`.startsWith("Bearer")) {
    const accessToken = `${req.headers.authorization}`.split(" ")[1];
    if (accessToken === "null") {
      return res.status(401).json({ error: "Unauthorized !" });
    } else {
      JWT.verify(accessToken, "filmTicketBooking", async (error, decodedToken) => {
        if (error) {
          return res.status(401).json({ message: "Phiên đăng nhập của bạn đã hết hạn !", error: "Expired Token !" });
        } else if (!error && decodedToken) {
          const foundedUser = await User.findById(decodedToken.foundedUser._id);
          if (!foundedUser) {
            return res.status(400).json({ error: "Người dùng không tồn tại !" });
          } else {
            const user = {
              _id: foundedUser._id,
              email: foundedUser.email,
              displayName: foundedUser.displayName,
              avatar: foundedUser.avatar
            }
            req.body.user = user;
            next();
          }
        }
      });
    }
  }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong !");
  }
}