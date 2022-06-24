const nodemailer = require('nodemailer');
const EMAILPASSWORD = process.env.EMAILPASSWORD;
const EMAIL = process.env.EMAIL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: EMAILPASSWORD,
  },
  port: 465,
  host: 'smtp.gmail.com',
});

const verfyEmail = (email, uniqueStr) => {
  const mailOptions = {
    from: 'stigmaoneil@gmail.com',
    to: email,
    subject: 'verfy your email',
    text: 'Email confirmation',
    html:
      '<p>Click <a href="http://localhost:5000/register/verification/' +
      uniqueStr +
      '">here</a> to reset your password</p>',
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

const loginSendEmail = (email) => {};

module.exports = {
  verfyEmail,
  loginSendEmail,
};
