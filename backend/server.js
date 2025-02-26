const express = require('express');
require('dotenv').config();
const { db } = require('./config/firebase');
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

console.log(transporter);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));  // Serve public files
app.use(cors());
// Submit form and send verification email

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post('/submit-form', async (req, res) => {
  const { name, email, number, plan } = req.body;

  if (!name || !email || !number || !plan) {
    return res.status(400).json({ message: 'Name, Email and Number are required.' });
  }
  try {

  } catch (error) {

  }
  const token = crypto.randomBytes(16).toString('hex');

  // const db = admin.firestore();
  const tokenRef = db.collection('tokens').doc(token);

  await tokenRef.set({
    name,
    email,
    number,
    plan
    // createdAt: db.firestore.FieldValue.serverTimestamp(),
  });

  const verificationLink = `https://api.ibrandnow.com/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirm Your Email',
    // text: `Click here to verify: ${verificationLink}`
    html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; height: 100vh; text-align: center;">
    <tr>
      <td align="center" style="padding: 20px;">
        <!-- Email Container -->
        <table width="400" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); text-align: center;">
          <tr>
            <td style="padding: 20px;">
              <h1 style="font-size: 24px; color: #333333; font-family: Arial, sans-serif; margin: 0 0 20px;">Welcome to iBrandNow</h1>
              <p style="font-size: 16px; color: #555555; font-family: Arial, sans-serif; margin: 0 0 30px;">
                Please click the button below to verify your email address.
              </p>
              <a href="${verificationLink}" style="display: inline-block; background-color: #28a745; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-family: Arial, sans-serif;">
                Verify Email Address
              </a>
              <p style="font-size: 14px; color: #888888; font-family: Arial, sans-serif; margin: 20px 0 0;">
                If you did not create an account, no further action is required.
              </p>
              <p style="font-size: 14px; color: #888888; font-family: Arial, sans-serif; margin: 20px 0 0;">
                If you're having trouble clicking the button, copy and paste the URL below into your web browser:<br>
                <a href="${verificationLink}" style="color: #007bff; text-decoration: none;">
                ${verificationLink}
                </a>
              </p>
            </td>
          </tr>
        </table>
        <!-- End Email Container -->
      </td>
    </tr>
  </table>
</body>
</html>
`,
  };
  console.log(mailOptions)
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

  const tokenRef = db.collection('tokens').doc(token);
  const tokenDoc = await tokenRef.get();

  if (!tokenDoc.exists) {
    return res.status(400).send('Invalid or expired token.');
  }

  const userData = tokenDoc.data();
  await db.collection('users').add(userData);
  await tokenRef.delete();

  // res.status(200).send(`
  //   <html>
  //     <head><title>Welcome</title></head>
  //     <body>
  //       <h1>Welcome, ${userData.name}!</h1>
  //       <p>Your email has been successfully verified!</p>
  //       <p><a href="/home">Go to your homepage</a></p>
  //     </body>
  //   </html>
  // `);

  res.redirect(`https://ibrandnow.com/success.html`);
});

// Start server
app.listen(3010, () => {
  console.log('Server is running on http://localhost:3000');
  console.log()
});
