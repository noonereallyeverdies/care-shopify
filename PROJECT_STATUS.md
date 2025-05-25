# Hydrogen Care E-commerce App

A modern Shopify Hydrogen storefront for care and wellness products built with Remix, React, and TypeScript.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Update with your Shopify store credentials
   - Generate a secure session secret

3. **Start Development:**
   ```bash
   npm run dev
   ```

## 📋 Project Status

### ✅ Completed Features
- **Cart System**: Full cart functionality with CartProvider integration
- **Layout System**: Responsive PageLayout with header/footer
- **Navigation**: Multi-level navigation with mobile support
- **Product Display**: Product grids, collections, and detail pages
- **Responsive Design**: Mobile-first Tailwind CSS styling
- **Performance**: Optimized fonts, images, and code splitting

### 🔧 Current Configuration
- **Framework**: Shopify Hydrogen + Remix
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context for cart state
- **Fonts**: Montserrat + Playfair Display (Google Fonts)
- **Icons**: Custom SVG icon system

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Cart.tsx        # Cart drawer and page components
│   ├── PageLayout.tsx  # Main layout wrapper
│   └── ui/             # UI primitives
├── contexts/           # React contexts
│   └── CartContext.tsx # Cart state management
├── routes/             # Remix routes
├── styles/             # CSS files
└── lib/                # Utilities and helpers
```

## 🔒 Security Notes

- API tokens are properly secured and not committed to git
- Environment variables are documented in `.env.example`
- Session secrets should be randomly generated for production

## 🛠 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 📚 Additional Documentation

Historical documentation and migration notes are archived in `docs/archive/` to keep the root directory clean.

## 🆘 Support

For Shopify Hydrogen specific questions, consult the [official documentation](https://shopify.dev/docs/custom-storefronts/hydrogen).
