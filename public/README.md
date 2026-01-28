# 🌱 Wellness Garden - Frontend

A beautiful, calming wellness application with an aesthetic neutral color palette.

## ✨ What's New

### 🎨 Aesthetic Design Updates
- **Calming Color Palette**: Sage green, soft cream, warm taupe, dusty rose
- **Smooth Animations**: Hover effects, transitions, and subtle interactions
- **Modern UI**: Glassmorphism effects, soft shadows, and elegant typography
- **Responsive Design**: Looks beautiful on all screen sizes

### 🔧 Technical Improvements
- **Auto-detecting API URL**: Works on localhost and deployed environments
- **Better Error Handling**: Clear error messages for connection issues
- **Fixed hardcoded URLs**: All API calls now use the dynamic `API_URL`
- **Improved UX**: Loading states, smooth transitions, better feedback

## 📁 Project Structure

```
wellness-garden-frontend/
├── css/
│   └── style.css         # Beautiful aesthetic styling
├── js/
│   ├── utils.js          # Utility functions + auto-detecting API URL
│   ├── auth.js           # Authentication with better error handling
│   ├── garden.js         # Garden management
│   └── challenges.js     # Challenge system
├── index.html            # Landing page
├── login.html            # Login page
├── register.html         # Registration page
├── dashboard.html        # User dashboard
├── garden.html           # Plant garden view
├── plants.html           # Plant catalog
└── challenges.html       # Challenges page
```

## 🚀 Quick Start

### Prerequisites
- A backend server running on port 3000 (see backend setup)
- Modern web browser

### Setup

1. **Extract the files** to your web server or local directory

2. **Start your backend server** (it should be running on port 3000)

3. **Open the frontend**:
   - **Option A** (Local File): Open `index.html` directly in your browser
   - **Option B** (Web Server): Use a local server like:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js (http-server)
     npx http-server -p 8000
     ```
   - **Option C** (VS Code): Use Live Server extension

4. **Access the app**:
   - Local file: `file:///path/to/index.html`
   - Web server: `http://localhost:8000`

## 🎨 Color Palette

The Wellness Garden uses a calming, aesthetic neutral color scheme:

```css
Primary Colors:
- Sage Green:      #A8B5A0
- Soft Cream:      #F5F1E8
- Warm Taupe:      #D4C5B9

Accent Colors:
- Dusty Rose:      #D4A5A5
- Soft Eucalyptus: #C9D5C0
- Warm Sand:       #E8DCC8
- Misty Sage:      #B8C5B0

Text Colors:
- Deep Forest:     #4A5D4F (headings)
- Charcoal:        #5A5A5A (body text)
- Light Sage:      #B8C5B0 (muted text)
```

## 🐛 Troubleshooting

### "Failed to load" error

**Problem**: Frontend can't connect to backend

**Solutions**:
1. **Check backend is running**:
   ```bash
   # Should see your backend running
   netstat -an | grep 3000
   ```

2. **Check API URL in browser console**:
   - Open browser DevTools (F12)
   - Look for the API URL being used
   - It should match your backend URL

3. **CORS Issues**: Make sure your backend has CORS enabled:
   ```javascript
   // Backend should have:
   app.use(cors());
   ```

4. **Different Port?**: If your backend runs on a different port, update `js/utils.js`:
   ```javascript
   const API_URL = 'http://localhost:YOUR_PORT';
   ```

### Page looks broken / No styles

**Problem**: CSS not loading

**Solutions**:
1. Check `css/style.css` exists in the same directory structure
2. Open browser DevTools → Network tab → Look for CSS 404 errors
3. Make sure you're using a web server (not file://) for best results

### Login/Register not working

**Problem**: Authentication fails

**Solutions**:
1. Check browser console for detailed error messages
2. Verify backend authentication endpoints are working
3. Clear browser localStorage and cookies
4. Try a different browser

## 📱 Features

- ✅ User authentication (register/login)
- ✅ Dashboard with stats
- ✅ Virtual plant garden
- ✅ Plant catalog with rarity tiers
- ✅ Wellness challenges
- ✅ Point system
- ✅ Plant growth mechanics
- ✅ Beautiful responsive design

## 🎯 Usage

### Creating an Account
1. Click "Sign Up" from the homepage
2. Fill in username, email, and password
3. Submit and check your email for confirmation

### Growing Your Garden
1. Complete wellness challenges to earn points
2. Use points to unlock new plant types
3. Plant seeds in your garden
4. Water your plants to help them grow
5. Watch them bloom from seed → sprout → growing → bloomed

### Challenge System
- Complete daily wellness challenges
- Earn points for each completion
- Create your own challenges for the community
- Track your progress

## 🔐 Environment Variables

The frontend automatically detects the environment:
- `localhost` or `127.0.0.1` → uses `http://localhost:3000`
- Other domains → uses current protocol and hostname with port 3000

To customize, edit `js/utils.js`:
```javascript
const API_URL = 'YOUR_CUSTOM_API_URL';
```

## 📊 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 💡 Tips for Best Experience

1. **Use a modern browser** for the best visual effects
2. **Allow cookies** for authentication persistence
3. **Enable JavaScript** (required for functionality)
4. **Check console** (F12) if something doesn't work

## 🎨 Customization

### Changing Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --sage-green: #YOUR_COLOR;
    --soft-cream: #YOUR_COLOR;
    /* ... etc */
}
```

### Adding New Features
1. Add HTML in the appropriate file
2. Add styling in `css/style.css`
3. Add JavaScript in `js/` folder
4. Update this README

## 🤝 Support

If you encounter issues:
1. Check browser console for errors (F12 → Console)
2. Verify backend is running
3. Clear cache and cookies
4. Try in incognito/private mode

## 📝 Notes

- The app stores authentication tokens in localStorage
- All dates are formatted in US format
- Plant emojis are rendered using Unicode
- Animations use CSS transitions for smoothness

---

Built with ❤️ for wellness and mindfulness
