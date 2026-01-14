# Telegram Integration Setup Guide

## Prerequisites
1. A Telegram account
2. Access to create bots on Telegram

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather
3. Send `/newbot` command
4. Follow the prompts to:
   - Give your bot a name (e.g., "Portfolio Contact Bot")
   - Choose a username ending with "bot" (e.g., `your_portfolio_bot`)
5. BotFather will provide you with a **Bot Token** - save this securely

## Step 2: Get Your Chat ID

1. Search for your newly created bot in Telegram
2. Start a chat with it and send any message
3. Visit this URL in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for your `chat.id` in the response - this is your Chat ID

## Step 3: Update the Script

Open `script.js` and replace these values:

```javascript
const BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Replace with your bot token
const CHAT_ID = 'YOUR_CHAT_ID'; // Replace with your chat ID
```

With your actual values:
```javascript
const BOT_TOKEN = '123456789:ABCdefGHIjklMNOpqrSTUvwxYZ'; // Your actual bot token
const CHAT_ID = '123456789'; // Your actual chat ID
```

## Step 4: Test the Integration

1. Save all files
2. Restart your server
3. Go to the contact form on your portfolio
4. Fill out and submit the form
5. Check your Telegram - you should receive both a text message and a PDF file

## Troubleshooting

### Common Issues:

1. **Bot not responding**: Make sure you've properly configured the bot token and chat ID
2. **Messages not arriving**: Check that your bot has permission to send messages to your chat
3. **PDF not generating**: Ensure jsPDF library is properly loaded

### Debugging Tips:

- Check browser console for JavaScript errors
- Verify network requests in developer tools
- Test Telegram API manually using the URLs provided

## Security Notes

- Never share your bot token publicly
- Consider adding rate limiting to prevent spam
- Store sensitive credentials in environment variables in production

## Alternative Setup

If you prefer not to use Telegram, you can modify the `sendToTelegram` function to send emails instead, or integrate with other messaging services like Discord webhooks or Slack.