
 var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require('nodemailer');
 
 
router.get("/", function (req, res) {
  res.render("pages/index", { "erros": null, "valores": {"nome":"","email":"","telefone":"", "assunto":"", "mensagem":""} ,"retorno":null });
});
 
router.post(
  "/index",
  body("nome").isLength({ min: 3, max: 30 })
      .withMessage("Nome deve ter de 3 a 30 caracteres!"),
  body("email").isEmail(),
  body("telefone").isLength({ min: 11, max: 11 }),
  body("assunto").isLength({ min: 3, max: 100 }),
  body("mensagem").isLength({ min: 3, max: 10000 }),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/index", { "erros": errors, "valores":req.body,"retorno":null});
    }
 
      return res.render("pages/index", { "erros": null, "valores":req.body,"retorno":req.body});
  }
);
 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // seu e-mail Gmail
        pass: process.env.EMAIL_PASS  // senha de app (não a senha da conta)
    },
    tls: {
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false, // ignorar certificado digital - APENAS EM DESENVOLVIMENTO
    }
});
  
const mailOptions = {
  from: "gbezerra8718@gmail.com",
  to: "gbezerra8718@gmail.com",
  subject: "dados do formulário",
  text: "informações do formulário",
  html: "<h1>Formulário</h1>"
};
 
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }else{
    console.log(info);
    console.log("email enviado");
  }
});
 
module.exports = router;