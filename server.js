const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3003;

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '8241595280:AAGsz3wmbSn-pIZidVe8Nims3W5xBQAWYc8';
const YOUR_CHAT_ID = '6941188875'; // Your actual Chat ID

// Initialize Telegram Bot
let bot = null;
if (TELEGRAM_BOT_TOKEN) {
    try {
        bot = new TelegramBot(TELEGRAM_BOT_TOKEN, {polling: true});
        console.log('Telegram bot initialized successfully');
        
        // Listen for any message to get chat ID (still useful for future reference)
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const firstName = msg.from.first_name || 'User';
            
            console.log(`Received message from ${firstName} (Chat ID: ${chatId})`);
            
            // Send the chat ID back to the user
            bot.sendMessage(chatId, `Hello ${firstName}! Your Chat ID is: ${chatId}\n\nSave this ID and add it to your server.js file.`);
            
            // Also send a welcome message with instructions
            bot.sendMessage(chatId, 'I will notify you whenever a new order is placed on your portfolio website.');
        });
    } catch (error) {
        console.error('Failed to initialize Telegram bot:', error.message);
    }
} else {
    console.log('Telegram bot token not provided');
}

// Middleware
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.raw({type: 'application/pdf', limit: '10mb'}));
app.use(express.static('.')); // Serve files from current directory

// Serve portfolio.html as main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

// PDF Storage Endpoint
app.post('/api/save-pdf', async (req, res) => {
    try {
        console.log('PDF save request received');
        
        // Get PDF data from request body
        const pdfBuffer = req.body;
        
        if (!pdfBuffer || pdfBuffer.length === 0) {
            console.error('No PDF data received');
            return res.status(400).json({ error: 'No PDF data received' });
        }
        
        console.log(`Received PDF data: ${pdfBuffer.length} bytes`);
        
        // Get filename from query parameters or generate default
        const filename = req.query.filename || `contact_form_${Date.now()}.pdf`;
        const orderPdfDir = path.join(__dirname, 'OrderPDF');
        const filePath = path.join(orderPdfDir, filename);
        
        console.log(`Saving PDF as: ${filename}`);
        console.log(`Full path: ${filePath}`);
        
        // Ensure OrderPDF directory exists
        if (!fs.existsSync(orderPdfDir)) {
            console.log('Creating OrderPDF directory');
            fs.mkdirSync(orderPdfDir, { recursive: true });
        }
        
        // Save PDF file
        fs.writeFileSync(filePath, pdfBuffer);
        
        // Verify file was saved
        const stats = fs.statSync(filePath);
        console.log(`PDF saved successfully: ${stats.size} bytes`);
        
        // Send success response
        res.json({ 
            success: true, 
            message: 'PDF saved successfully',
            filename: filename,
            path: filePath,
            size: stats.size
        });
        
    } catch (error) {
        console.error('Error saving PDF:', error);
        res.status(500).json({ 
            error: 'Failed to save PDF',
            details: error.message 
        });
    }
});

// Get list of saved PDFs
app.get('/api/pdf-list', (req, res) => {
    try {
        const orderPdfDir = path.join(__dirname, 'OrderPDF');
        
        if (!fs.existsSync(orderPdfDir)) {
            return res.json({ files: [] });
        }
        
        const files = fs.readdirSync(orderPdfDir)
            .filter(file => file.endsWith('.pdf'))
            .map(file => {
                const filePath = path.join(orderPdfDir, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    size: stats.size,
                    created: stats.birthtime,
                    modified: stats.mtime
                };
            })
            .sort((a, b) => new Date(b.created) - new Date(a.created));
        
        res.json({ files });
    } catch (error) {
        console.error('Error reading PDF directory:', error);
        res.status(500).json({ error: 'Failed to read PDF directory' });
    }
});

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
    // Send a message to the admin when server starts (if chat ID is available)
    if (bot && YOUR_CHAT_ID) {
        bot.sendMessage(YOUR_CHAT_ID, `Server started on port ${PORT}`)
            .catch(error => {
                console.log('Failed to send startup message:', error.code);
            });
    }
});
