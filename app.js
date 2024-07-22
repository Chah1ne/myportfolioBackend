require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Ou l'URL de votre client
  'https://chah1ne.github.io', // Deployed origin
}));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Portfolio New message from ${name}`,
    text: `From: ${email}\n\nMessage: ${message}`, // Inclut l'e-mail et le message dans le corps du mail
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
