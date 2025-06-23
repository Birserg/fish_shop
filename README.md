# Sunbeam - Website & Telegram Mini App

A modern fish shop application that works both as a regular website and a Telegram Mini App. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🐟 Fresh fish and seafood products
- 🛒 Shopping cart functionality
- 📱 Responsive design for all devices
- 🤖 Telegram Mini App integration
- ⚡ Fast loading with Next.js
- 🎨 Beautiful UI with Tailwind CSS
- 🔔 Toast notifications
- ✨ Smooth animations with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Telegram Integration**: Telegram Web App SDK

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fish_shop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run telegram-dev` - Start development server for Telegram (port 3001)
- `npm run build` - Build for production
- `npm run telegram-build` - Build for Telegram Mini App
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Telegram Mini App Setup

### 1. Create a Telegram Bot

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Get your bot token

### 2. Configure Mini App

1. Message [@BotFather](https://t.me/botfather) again
2. Use `/newapp` to create a new Mini App
3. Set the app URL to your deployed website URL
4. Get your Mini App username

### 3. Deploy

1. Build the app:
```bash
npm run telegram-build
```

2. Deploy the `out` folder to your hosting service (Vercel, Netlify, etc.)

3. Update your Mini App URL in BotFather with the deployed URL

### 4. Test

1. Open your bot in Telegram
2. Use the `/start` command
3. Click on your Mini App button

## Project Structure

```
fish_shop/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── types/                 # TypeScript definitions
│   └── telegram.d.ts      # Telegram Web App types
├── public/                # Static assets
│   ├── logo.jpeg          # Sunbeam logo
│   └── telegram-web-app.js # Telegram integration
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md             # This file
```

## Features

### Website Features
- Responsive design for desktop, tablet, and mobile
- Product catalog with images and descriptions
- Shopping cart with add/remove functionality
- Beautiful animations and transitions
- Contact information and business hours

### Telegram Mini App Features
- Native Telegram integration
- Automatic theme detection (light/dark mode)
- Telegram Web App API support
- Optimized for mobile viewing
- Same functionality as web version

## Customization

### Adding Products

Edit the `fishProducts` array in `app/page.tsx`:

```typescript
const fishProducts = [
  {
    id: 1,
    name: 'Product Name',
    price: 24.99,
    image: 'image-url',
    description: 'Product description',
    rating: 4.8,
    inStock: true
  },
  // Add more products...
]
```

### Styling

The app uses Tailwind CSS with Sunbeam brand colors. You can customize colors, fonts, and other styles in:
- `tailwind.config.js` - Theme configuration with Sunbeam color palette
- `app/globals.css` - Global styles and custom CSS

### Telegram Integration

The app automatically detects when it's running in Telegram and adjusts the UI accordingly. You can customize Telegram-specific behavior in the `useEffect` hook in `app/page.tsx`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify

### Other Platforms

The app can be deployed to any static hosting service since it's built as a static export.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the Sunbeam development team.

---

**Note**: This is a demo application. For production use, you'll need to:
- Add proper authentication
- Implement a backend API
- Add payment processing
- Set up a database
- Add proper error handling
- Implement security measures
