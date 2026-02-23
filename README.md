# Magnetic Therapy Ring E-Commerce Site

A modern, fully-functional e-commerce website built with Next.js 14 (App Router) for selling a magnetic therapy ring. Designed for the US market with a beautiful, responsive UI.

## Features

- 🛍️ **Single Product E-Commerce** - Focused on one premium product
- 🎨 **Modern UI/UX** - Beautiful design with Tailwind CSS
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🛒 **Shopping Cart** - Full cart functionality with quantity management
- 💳 **Checkout Flow** - Complete checkout process with form validation
- 🎯 **Component-Based** - Modular architecture with reusable components
- ⚡ **Fast Performance** - Built with Next.js 14 for optimal performance

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management for cart

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ALOWA/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── product/           # Product page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Header.tsx         # Site header with navigation
│   ├── Footer.tsx         # Site footer
│   └── ProductCard.tsx    # Product card component
├── contexts/              # React contexts
│   └── CartContext.tsx    # Shopping cart state management
└── package.json           # Dependencies and scripts
```

## Pages

- **Home** (`/`) - Landing page with hero section, features, and product preview
- **Product** (`/product`) - Detailed product page with size selection and add to cart
- **Cart** (`/cart`) - Shopping cart with quantity management
- **Checkout** (`/checkout`) - Checkout form with shipping and payment information

## Features in Detail

### Shopping Cart
- Add products to cart with size selection
- Update quantities
- Remove items
- Calculate totals with shipping and tax
- Free shipping over $50

### Product Page
- Product details and features
- Size selection (Small, Medium, Large, X-Large)
- Quantity selector
- Health benefits information
- Customer reviews section

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## Customization

### Product Information
Edit the product details in:
- `app/product/page.tsx` - Main product information
- `components/ProductCard.tsx` - Product card preview

### Styling
Customize colors and styling in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global CSS styles

### Pricing
Update prices in the product data objects throughout the application.

## License

This project is open source and available for personal and commercial use.
