const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { Op } = require("sequelize");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  if (!user) {
    return res.sendStatus(401);
  }

  bcrypt.compare(password, user.password, (err, data) => {
    if (err) {
      throw err;
    }
    if (data) {
      const token = jwt.sign(
        { sub: username },
        process.env.JWT_SECRET /*,{expiresIn: '40m'}*/
      );
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({ result: "Incorrect username or password" });
    }
  });
};

//SIGNUP
exports.signUp = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if(password !== confirm_password){
    return res.status(400).json({ result: "Passwords don't match"})
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

  User.create({
    username: username.toLowerCase(),
    email: email,
    password: hashedPassword,
  })
    .then(() => {
      console.log("Usuario creado");
      res.status(201).json({ result: "Success!" });
    })
    .catch((error) => {
      console.log(error)
      console.log("ERROR");
      res.status(400).json({ result: "Something went wrong" });
    });
};

//REQUEST RESET PASSWORD
exports.requestPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(400).json({ result: "Something went wrong" });
    }

    crypto.randomBytes(32, async (error, buffer) => {
      if (error) {
        throw error;
      }
      const token = buffer.toString("hex");
      const expirationDate = new Date(
        Date.now() + 3600000 + 1000 * 60 * -new Date().getTimezoneOffset()
      )
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");
      user.resetToken = token;
      user.resetTokenExpiration = expirationDate;
      await user.save();
      const msg = {
        to: user.email,
        from: process.env.SENDGRID_USER,
        templateId: "d-a718fec723204ccca4f03994f3885202",
        dynamicTemplateData: {
          username: user.username,
          token: user.resetToken,
        },
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
          return res.status(200).json({ result: "Check your email account" });
        })
        .catch((error) => {
          console.error(error);
          return res.status(400).json({ result: "Something went wrong" });
        });
    });
  } catch (error) {
    return res.status(400).json({ result: "Something went wrong" });
  }
};

exports.resetPassword = async (req, res) => {
    const { token }  = req.params;
  const { new_password, confirm_password } = req.body;
  const now = new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset())
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

  const user = await User.findOne({ where: { resetToken: token, resetTokenExpiration: {[Op.gt]: now} }});

  if (!user) {
    return res.status(404).json({ result: "Something went wrong" });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ result: "Passwords don't match" });
  }
  const hashedPassword = await bcrypt.hash(new_password,parseInt(process.env.SALT));

  user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ result: "Password reseted successfully" });
};
