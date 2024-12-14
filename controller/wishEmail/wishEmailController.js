const nodemailer = require('nodemailer');

const createWishEmailTemplate = (name, email, designation, dateOfBirth, dateOfAnniversary) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    const doa = new Date(dateOfAnniversary);
    
    const isBirthday = today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth();
    const isAnniversary = today.getDate() === doa.getDate() && today.getMonth() === doa.getMonth();
    
    let subject = '';
    let greeting = '';
    
    if (isBirthday) {
        subject = `🎉 Happy Birthday, ${name}! 🎂`;
        greeting = `<h1 style="color: #FF6347;">🎉 Happy Birthday, ${name}! 🎂</h1>
                    <p>Wishing you a fantastic day filled with joy, love, and laughter!</p>
                    <p>May all your dreams come true this year!</p>`;
    } else if (isAnniversary) {
        subject = `💖 Happy Anniversary, ${name}! 💍`;
        greeting = `<h1 style="color: #FF69B4;">💖 Happy Anniversary, ${name}! 💍</h1>
                    <p>Wishing you a day as special as your love for each other!</p>
                    <p>Here's to many more years of happiness together!</p>`;
    } else {
        return `<h1 style="color: #FF4500;">No Celebrations Today!</h1>
                <p>But remember, every day is a gift!</p>`;
    }
    
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                }
                .card {
                    background-color: #ffffff;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    text-align: center;
                }
                h1 {
                    font-size: 36px;
                    margin: 0;
                }
                p {
                    font-size: 18px;
                    line-height: 1.5;
                    color: #333;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 16px;
                    color: #555;
                }
                .kcmt-logo {
                    display: block;
                    margin: 20px auto;
                    width: 100px;
                }
                .birthday-image {
                    width: 100%;
                    max-width: 400px;
                    border-radius: 10px;
                    margin: 20px auto;
                }
                .emoji {
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        ${greeting}
                    </div>
                    <div class="card-content">
                        <img src="https://example.com/birthday-image.jpg" alt="Happy Celebration" class="birthday-image" />
                        <p>Best Wishes,</p>
                        <p><strong>Your Friends at KCMT College</strong></p>
                        <p class="footer">📧 Contact: ${email} | Role: ${designation}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};


const sendWishEmail = async (req, res) => {
    const { email, name, designation, dateOfBirth, dateOfAnniversary } = req.body;

    // Validate input
    if (!email || !name || !designation || !dateOfBirth || !dateOfAnniversary) {
        return res.status(400).json({ message: 'Missing required fields: email, name, designation, dateOfBirth, dateOfAnniversary' });
    }

    try {
        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,    // Make sure this environment variable is set
                pass: process.env.PASSWORD, // Make sure this environment variable is set
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: email,               // Recipient address
            subject: `Celebration Notice for ${name}!`,
            html: createWishEmailTemplate(name, email, designation, dateOfBirth, dateOfAnniversary),
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Wish email sent successfully', info });
    } catch (error) {
        console.error('Error sending wish email:', error);
        res.status(500).json({ message: 'Failed to send wish email', error });
    }
};



module.exports = {
    sendWishEmail,
};