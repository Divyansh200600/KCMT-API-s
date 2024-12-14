const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// All Routes Define Here
const emailRoutes = require('./routes/wishEmail/wishEmailRoute');
app.use('/api', emailRoutes);

app.get('/', (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>KCMT College API Documentation</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #f0f4ff, #e1e9fc);
                    color: #333;
                    overflow-x: hidden;
                }
                header {
                    background: #007bff;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                    position: relative;
                }
                header h1 {
                    margin: 0;
                    font-size: 2.5em;
                }
                header p {
                    font-size: 1.2em;
                }
                .container {
                    max-width: 1200px;
                    margin: 20px auto;
                    padding: 20px;
                    background: white;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .api-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                }
                .api-card {
                    background: #f7f9fc;
                    border-radius: 10px;
                    padding: 15px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
                    transition: transform 0.3s;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .api-card:hover {
                    transform: translateY(-5px);
                }
                .api-card h3 {
                    margin-top: 0;
                    color: #007bff;
                }
                .api-card p {
                    flex-grow: 1;
                }
                .btn {
                    background-color: #28a745;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    text-align: center;
                    display: inline-block;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #218838;
                }
                footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #007bff;
                    color: white;
                    position: relative;
                    bottom: 0;
                    width: 100%;
                }
                @media (max-width: 600px) {
                    header, footer {
                        padding: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <header>
                <h1>KCMT College API Documentation</h1>
                <p>Explore our API for sending personalized messages and more!</p>
            </header>
            <div class="container">
                <h2>Available API Endpoints</h2>
                <div class="api-list">
                    <div class="api-card">
                        <h3>Send Wish Email</h3>
                        <p>POST /api/send-wish-email - Send a personalized birthday or anniversary wish email.</p>
                        <p><strong>Required:</strong> to, name, designation, dateOfBirth, dateOfAnniversary.</p>
                        <a href="/api/send-wish-email" class="btn">Try it Out</a>
                    </div>
                    <!-- Add more API endpoints here as needed -->
                </div>
            </div>
            <footer>
                <p>Contact us at: <a href="mailto:support@kcmtcollege.edu" style="color: white;">support@kcmtcollege.edu</a></p>
                <p>&copy; 2024 KCMT College</p>
            </footer>
        </body>
        </html>
    `);
});

// Export the app as a serverless function
module.exports = app; // Export for Vercel
