const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3977;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const emailContainer = process.env.EMAIL || 'maximoportunista14@gmail.com';
const pass = process.env.PASS || 'dblhkeyumlmjatdm';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: emailContainer,
      pass: pass
    }
});

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.post('/enviar-correo', (req, res)=>{
    const {email} = req.body; 
    console.log(req.body);
    const mailOptions = {
        from: 'pruebitapah@gmail.com',
        to: emailContainer,
        subject: 'Asunto del correo',
        text: 'Contenido de prueba',
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).send('Error al enviar el correo');
        } else {
          console.log('Correo enviado con éxito:', info.response);
          res.status(200).send('Correo enviado con éxito');
        }
      });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});