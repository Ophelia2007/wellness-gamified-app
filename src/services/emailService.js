const nodemailer = require('nodemailer');

// ##############################################################
// CREATE EMAIL TRANSPORTER
// ##############################################################
let transporter;

try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'test@example.com',
      pass: process.env.EMAIL_PASSWORD || 'testpassword'
    }
  });
  
  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('❌ Email transporter verification failed:', error.message);
      console.log('⚠️ Email functionality may not work. Check EMAIL_USER and EMAIL_PASSWORD in .env file.');
    } else {
      console.log('✅ Email transporter is ready to send messages');
    }
  });
} catch (error) {
  console.error('❌ Failed to create email transporter:', error.message);
  // Create a dummy transporter that won't fail
  transporter = {
    sendMail: (mailOptions, callback) => {
      console.log('⚠️ Email service not configured. Skipping email:', mailOptions.to);
      callback(null, { messageId: 'dummy-id', accepted: [mailOptions.to] });
    }
  };
}

// ##############################################################
// SEND WELCOME EMAIL
// ##############################################################
module.exports.sendWelcomeEmail = (userData, callback) => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'test@example.com') {
    console.log('⚠️ Email not configured. Skipping welcome email for:', userData.email);
    return callback(null, { message: 'Email not configured' });
  }
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'wellness@garden.com',
    to: userData.email,
    subject: '🌱 Welcome to Wellness Garden!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">Welcome to Wellness Garden! 🌱</h1>
        
        <p>Hi <strong>${userData.userName}</strong>,</p>
        
        <p>Thank you for joining Wellness Garden! We're excited to have you on your wellness journey.</p>
        
        <div style="background-color: #f0f8f0; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #4CAF50;">Your Account Details</h2>
          <p><strong>Username:</strong> ${userData.userName}</p>
          <p><strong>Email:</strong> ${userData.email}</p>
          <p><strong>Points:</strong> 0 (Start completing challenges to earn!)</p>
        </div>
        
        <h3>🎯 Getting Started:</h3>
        <ol>
          <li>Complete wellness challenges to earn points</li>
          <li>Use points to unlock rare and exotic plants</li>
          <li>Grow your digital garden as you improve your health</li>
          <li>Watch your plants bloom from seed to beautiful flowers!</li>
        </ol>
        
        <div style="background-color: #e8f5e9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
          <h3 style="margin-top: 0;">🎁 Free Starter Plants!</h3>
          <p>You can plant <strong>Sunflowers</strong> and <strong>Daisies</strong> right away - no points needed!</p>
        </div>
        
        <p>Happy gardening! 🌸</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated message from Wellness Garden. Please do not reply to this email.
        </p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, callback);
};

// ##############################################################
// SEND CHALLENGE COMPLETION EMAIL
// ##############################################################
module.exports.sendChallengeCompletionEmail = (userData, challengeData, callback) => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'test@example.com') {
    console.log('⚠️ Email not configured. Skipping completion email for:', userData.email);
    return callback(null, { message: 'Email not configured' });
  }
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'wellness@garden.com',
    to: userData.email,
    subject: '🎉 Challenge Completed! You Earned Points!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">Challenge Completed! 🎉</h1>
        
        <p>Hi <strong>${userData.username}</strong>,</p>
        
        <p>Congratulations! You've completed a wellness challenge!</p>
        
        <div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="color: #ff9800; margin-top: 0;">Challenge Details</h2>
          <p><strong>Challenge:</strong> ${challengeData.description}</p>
          <p><strong>Points Earned:</strong> +${challengeData.points} 🌟</p>
          <p><strong>Total Points:</strong> ${userData.newPoints}</p>
        </div>
        
        ${userData.newPoints >= 500 && userData.oldPoints < 500 ? `
          <div style="background-color: #fce4ec; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #e91e63;">
            <h2 style="color: #e91e63; margin-top: 0;">🎊 RARE PLANTS UNLOCKED!</h2>
            <p>You've reached <strong>500 points</strong>! You can now plant:</p>
            <ul>
              <li>🌹 Rose</li>
              <li>🌷 Tulip</li>
            </ul>
            <p>Visit your garden to plant these beautiful flowers!</p>
          </div>
        ` : ''}
        
        ${userData.newPoints >= 1500 && userData.oldPoints < 1500 ? `
          <div style="background-color: #e1f5fe; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #03a9f4;">
            <h2 style="color: #03a9f4; margin-top: 0;">🎊 EPIC PLANTS UNLOCKED!</h2>
            <p>Amazing! You've reached <strong>1500 points</strong>! You can now plant:</p>
            <ul>
              <li>🌸 Cherry Blossom</li>
              <li>🌺 Orchid</li>
            </ul>
            <p>These exotic plants are waiting for you!</p>
          </div>
        ` : ''}
        
        <p>Keep up the great work! 💪</p>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This is an automated message from Wellness Garden.
        </p>
      </div>
    `
  };

  transporter.sendMail(mailOptions, callback);
};

