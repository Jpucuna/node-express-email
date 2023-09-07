const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3977;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const emailContainer = process.env.EMAIL || 'maximoportunista14@gmail.com';
const pass = process.env.PASS || 'dblhkeyumlmjatdm';


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailContainer,
      pass: pass
    }
});

app.get('/',(req, res)=>{
    res.send('hello world')
})

app.post('/enviar-correo', (req, res)=>{
    const {email, name, subject, message} = req.body; 
    const content = `<h3>
    Te notificamos que has recibido el siguiente correo:
    <br>
    <br>
        Nombre: ${name}
    <br>
        Email:  ${email}
    <br>
        Asunto: ${subject}
    <br>
    <br>

        Mensaje:
    <br>
        ${message}
    </h3>`
    const mailOptions = {
        from: email,
        to: emailContainer,
        subject: subject,
        html: content,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          res.status(500).send({error:'Error al enviar el correo'});
        } else {
          console.log('Correo enviado con éxito:', info.response);
          res.status(200).send({data:'Correo enviado con éxito'});
        }
      });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});