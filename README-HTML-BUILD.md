# ABC Active Breathing Course - HTML/CSS/JS Build

This is a pure HTML, CSS, and JavaScript version of the ABC Active Breathing Course website, converted from the original Next.js application.

## 🎯 Features

- **Pure HTML/CSS/JS** - No frameworks, no build process required
- **Responsive Design** - Works on all devices
- **Local Storage** - Progress tracking without backend
- **Modal System** - Contact, Donate, and Enroll forms
- **Video Unlocking** - Progressive course unlocking system
- **6 Week Structure** - Complete course layout

## 📁 Project Structure

```
├── index.html          # Main landing page
├── week-1.html         # Week 1 exercises (fully functional)
├── week-2.html         # Week 2 placeholder
├── week-3.html         # Week 3 placeholder
├── week-4.html         # Week 4 placeholder
├── week-5.html         # Week 5 placeholder
├── week-6.html         # Week 6 placeholder
├── styles.css          # All CSS styles
├── main.js             # Main JavaScript functionality
├── week-1.js           # Week 1 specific JavaScript
└── public/
    └── assets/
        ├── images/     # All images
        ├── videos/     # All videos
        └── fonts/      # Custom fonts
```

## 🚀 Getting Started

### Option 1: Direct Browser (Simple)

1. Simply open `index.html` in your web browser
2. Navigate through the site

### Option 2: Local Server (Recommended)

For better video playback and to avoid CORS issues:

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js:
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📄 Pages

### Main Pages
- **index.html** - Landing page with hero section, introduction, benefits, sessions, and enrollment
- **week-1.html** - Week 1 exercises with video unlocking system
- **week-2.html to week-6.html** - Placeholder pages for future content

## ⚙️ Functionality

### Course Unlocking System
1. Click "START COURSE" on the home page OR
2. Watch 90% of the intro video
3. Week 1 exercises will be unlocked

### Video Progress Tracking
- Watch 90% of Exercise 1 to unlock Exercise 2
- Progress is saved in browser's localStorage
- Use "RESET DEMO" button on week pages to clear progress

### Modal System
- **Contact Us** - Send inquiries (demo mode)
- **Donate** - Support the cause (demo mode)
- **Enroll** - Join the course (demo mode)

### Newsletter
- Subscribe to updates (demo mode)
- Form validation included

## 🎨 Styling

The site uses:
- **Google Fonts**: Bebas Neue, Lato, Oswald
- **Custom Fonts**: MyType, Skytree (located in /public/assets/)
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Floating bears, glowing effects, smooth transitions

## 🔧 Customization

### Adding Content to Week Pages

To add full content to week-2.html through week-6.html, follow the structure from week-1.html:

1. Add exercise sections with titles
2. Include video elements
3. Create corresponding week-X.js file for video unlocking
4. Update modal system if needed

### Modifying Colors

Week-specific colors are defined in styles.css:
- Week 1: Blue (#345AA6)
- Week 2: Teal (#5EC0C1)
- Week 3: Pink (#ED6C9B)
- Week 4: Yellow (#D1D645)
- Week 5: Orange (#FAB314)
- Week 6: Beige (#EBD3AD)

### Backend Integration

Currently, all forms work in "demo mode" (no actual submission). To integrate with a backend:

1. Update form handlers in `main.js`:
   - `handleNewsletterSubmit()`
   - `handleModalSubmit()`

2. Replace demo responses with actual API calls:
```javascript
const response = await fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

## 🌐 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the entire folder
- **Vercel**: Deploy as static site
- **GitHub Pages**: Push to repository and enable GitHub Pages
- **AWS S3**: Upload to S3 bucket and enable static website hosting

### Traditional Hosting
- Upload all files to your web server's public directory
- Ensure file permissions are set correctly
- Access via your domain

## 📝 Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- IE11: ⚠️ Limited support (not recommended)

## 🐛 Known Limitations

1. **No Backend**: Forms don't actually submit anywhere (demo mode)
2. **Local Storage**: Progress is browser-specific and can be cleared
3. **No Database**: All data is temporary
4. **Video Streaming**: Large video files may take time to load

## 📞 Support

For issues or questions:
- Email: info@voh.org.uk
- Address: 161A Clarence Street, Kingston-Upon-Thames, Surrey KT1 1QT
- Charity Registration: 1187454

## 📄 License

Copyright © 2026 Voices of Hope

---

**Note**: This is a converted version from the original Next.js application. All Next.js, React, and Clerk authentication dependencies have been removed for a pure HTML/CSS/JS experience.
