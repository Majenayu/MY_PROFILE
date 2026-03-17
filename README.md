# 🚀 P G Ayush Rai - Portfolio Website

A modern, interactive portfolio website built with Node.js, Express, and MongoDB. Features a futuristic design with animated elements, achievement badges, and dynamic lighting effects.

## ✨ Features

- **Interactive Profile Display** - Dynamic character animation and profile information
- **Achievement Badge System** - Add, edit, and showcase your accomplishments
- **Orbiting Navigation Nodes** - Futuristic navigation with electrical effects
- **Real-time Profile Editing** - Update your information on the fly
- **Responsive Design** - Works seamlessly across all devices
- **Cloud Image Storage** - Integrated with Cloudinary for image management
- **MongoDB Integration** - Persistent data storage for profiles and badges

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **File Upload**: Multer with Cloudinary storage
- **Frontend**: Vanilla JavaScript, CSS3 with animations
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: SVG icons for navigation nodes

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Majenayu/MY_PROFILE.git
   cd MY_PROFILE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
MY_PROFILE/
├── public/                 # Static files
│   ├── profile.html       # Main profile page
│   ├── profile-editor.html # Profile editing interface
│   ├── badge-register.html # Badge management
│   ├── style.css          # Global styles
│   └── script.js          # Client-side JavaScript
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in repo)
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🎯 API Endpoints

### Profile Management
- `GET /api/profile` - Retrieve profile data
- `POST /api/profile` - Create/update profile

### Badge Management
- `GET /api/badges` - Get all badges
- `POST /api/badges` - Create new badge
- `PUT /api/badges/:id` - Update existing badge
- `DELETE /api/badges/:id` - Delete badge

## 🎨 Features Overview

### Interactive Elements
- **Orbiting Nodes**: Click to navigate to different sections
- **Dynamic Lighting**: Mouse movement affects ambient lighting
- **Electrical Effects**: Hover animations on navigation nodes
- **Rotating Coin**: Central 3D animated element

### Navigation Nodes
- 📄 **Documents** - Portfolio documents (coming soon)
- 🎥 **YouTube** - Links to YouTube channel
- 💻 **GitHub** - Links to GitHub profile
- 💼 **LinkedIn** - Links to LinkedIn profile
- ⚙️ **Settings** - Profile editor
- 📧 **Contact** - Contact modal

### Keyboard Shortcuts
- `Ctrl + E` - Open profile editor
- `Ctrl + B` - Open badge manager

## 🔧 Customization

### Updating Profile Information
1. Navigate to the profile editor (`/profile-editor.html`)
2. Update your information
3. Upload a new character image if desired
4. Save changes

### Managing Badges
1. Go to badge register (`/badge-register.html`)
2. Add new achievements with titles, descriptions, and images
3. Choose colors and categories
4. Edit or delete existing badges

### Styling
- Modify `public/style.css` for visual changes
- Update CSS variables in `:root` for color scheme changes
- Adjust animations and transitions as needed

## 🌐 Deployment

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy from the main branch

### Vercel Deployment
1. Import project to Vercel
2. Set environment variables
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**P G Ayush Rai**
- GitHub: [@Majenayu](https://github.com/Majenayu)
- LinkedIn: [P G Ayush Rai](https://linkedin.com/in/pgayushrai)
- Email: pgayushrai@gmail.com

## 🙏 Acknowledgments

- Inspired by futuristic UI/UX designs
- Built with modern web technologies
- Special thanks to the open-source community

---

⭐ **Star this repository if you found it helpful!**