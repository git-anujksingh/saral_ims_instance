const nodemailer = require("nodemailer");

exports.sendMail = async (req, res) => {

  let body = {
    name : req.body.name,
    from : req.body.from,
    to : req.body.to,
    subject : req.body.subject,
    content : req.body.content
  }

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "anujkumar.3855@gmail.com",
      pass: "cvwnhhufeiwhkyzw",
    },
  });

  let info = await transporter.sendMail({
    from: body.name +"<"+body.from+">",
    to: body.to,
    subject: body.subject,
    html: body.content,
  });
  res.json(info);
};