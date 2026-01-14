# Web Portfolio

A modern, responsive web portfolio showcasing skills and projects.

## 🚀 Features

- **Responsive Design** - Works on all devices
- **Modern UI** - Glass morphism effects and smooth animations
- **Contact Form** - Generates PDFs and sends to Telegram
- **Credentials Timeline** - Interactive professional journey display
- **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- jsPDF for PDF generation
- Telegram Bot API integration

## 📁 Project Structure

```
webportfolio/
├── portfolio.html          # Main HTML file
├── styles.css             # Custom styles
├── script.js              # JavaScript functionality
├── server.js              # Node.js server
├── package.json           # Dependencies
├── firebase.json          # Firebase configuration
├── .gitignore            # Git ignore rules
└── .github/
    └── workflows/
        └── firebase-deploy.yml  # Auto-deployment
```

## 🚀 Deployment

### Prerequisites
- Node.js installed
- Firebase account
- GitHub account

### Setup Instructions

1. **Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/webportfolio.git
git push -u origin main
```

2. **Setup Firebase**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

3. **Configure GitHub Secrets**
- Go to GitHub Repo → Settings → Secrets
- Add `FIREBASE_SERVICE_ACCOUNT` with your Firebase key

4. **Deploy Manually**
```bash
firebase deploy
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
node server.js

# Visit http://localhost:3003
```

## 📱 Features in Action

- **PDF Generation** - Contact forms generate downloadable PDFs
- **Telegram Integration** - Form submissions sent to Telegram bot
- **Responsive Layout** - Adapts to mobile, tablet, and desktop
- **Smooth Animations** - Modern UI with engaging transitions

## 🎨 Customization

Edit `portfolio.html`, `styles.css`, and `script.js` to customize:
- Colors and themes
- Content and sections
- Animations and effects
- Form fields and validation

## 📞 Contact Integration

The contact form automatically:
1. Validates user input
2. Generates professional PDF
3. Saves to server (`OrderPDF/` folder)
4. Sends to configured Telegram bot

## 🔄 Automatic Updates

Push to GitHub → Auto-deploys to Firebase Hosting

Made with ❤️ using modern web technologies