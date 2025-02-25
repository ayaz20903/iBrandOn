const express = require('express');
require('dotenv').config();
const {db} = require('./config/firebase');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');


const app = express();

// console.log(process.env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve public files
app.use(cors());
// Submit form and send verification email
app.post('/submit-form', async (req, res) => {
  const { name, email } = req.body;

  console.log(name,email)
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required.' });
  }

  const token = crypto.randomBytes(16).toString('hex');

  // const db = admin.firestore();
  const tokenRef = db.collection('tokens').doc(token);

  await tokenRef.set({
    name,
    email,
    // createdAt: db.firestore.FieldValue.serverTimestamp(),
  });

  const verificationLink = `http://ibrandnow/verify?token=dsffuishf`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Please verify your email',
    text: `Click here to verify: ${verificationLink}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error sending email', error: err });
    }
    res.status(200).json({ message: 'Verification email sent.' });
  });
});

// Token verification route
app.get('/verify', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Token is required.');
  }

  const db = admin.firestore();
  const tokenRef = db.collection('tokens').doc(token);
  const tokenDoc = await tokenRef.get();

  if (!tokenDoc.exists) {
    return res.status(400).send('Invalid or expired token.');
  }

  const userData = tokenDoc.data();
  await db.collection('users').add(userData);
  await tokenRef.delete();

  res.status(200).send(`
    <html>
      <head><title>Welcome</title></head>
      <body>
        <h1>Welcome, ${userData.name}!</h1>
        <p>Your email has been successfully verified!</p>
        <p><a href="/home">Go to your homepage</a></p>
      </body>
    </html>
  `);
});

// Start server
app.listen(3010, () => {
  console.log('Server is running on http://localhost:3000');
  console.log()
});
