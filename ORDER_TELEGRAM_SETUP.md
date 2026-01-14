# Order Form Telegram Integration Setup

## Overview
The service order form now generates PDF documents and sends them directly to your Telegram account, just like the contact form.

## Setup Instructions

### 1. Use the Same Telegram Bot
You can use the same Telegram bot that you set up for the contact form:
- Bot Token: Same as contact form
- Chat ID: Same as contact form

### 2. Update Script Configuration
In `script.js`, find these lines in both functions:
```javascript
const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your bot token
const CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your chat ID
```

Replace with your actual values from the contact form setup.

### 3. What Gets Sent
When someone submits a service order, you'll receive:
1. **Text Message** with:
   - Customer name, email, WhatsApp
   - Selected services
   - Budget and deadline
   - Additional message
   - Timestamp

2. **PDF Document** containing:
   - Professional formatted order details
   - Company information
   - All customer data organized in sections
   - Timestamp of submission

### 4. File Naming
PDF files are named: `service_order_[timestamp].pdf`

### 5. Testing
1. Fill out the service order form
2. Submit it
3. Check your Telegram for both the text message and PDF attachment

## Benefits
- Instant notifications for new orders
- Professional PDF documentation
- All order details in one place
- No server-side processing required
- Works entirely client-side

## Troubleshooting
Same troubleshooting steps as the contact form apply here as well.