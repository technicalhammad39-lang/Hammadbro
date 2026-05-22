# Portfolio - Product Designer

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This project showcases Jenny's work as a Product Designer with a beautiful, interactive interface.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations and transitions
- **Interactive Components**: Hover effects, sliders, and dynamic content
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for consistent styling

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Sliders**: Swiper.js
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
my-project/
├── public/                 # Static assets
│   ├── *.svg              # SVG images and icons
│   └── favicon.ico        # Site favicon
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page component
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx     # Navigation component
│   │   ├── Footer.tsx     # Footer component
│   │   └── ui/            # UI components
│   │       ├── ArrowButton.tsx
│   │       ├── Blog.tsx
│   │       ├── CustomeText.tsx
│   │       ├── DualButtons.tsx
│   │       ├── GenericSlider.tsx
│   │       ├── OrangeButton.tsx
│   │       ├── PortfolioCard.tsx
│   │       ├── ReviewCard.tsx
│   │       └── ServicesCard.tsx
│   └── data/              # Data and types
│       └── data.ts        # Mock data and interfaces
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 🎨 Components Overview

### Core Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Contact information and social links
- **CustomeText**: Reusable text component with animations

### UI Components
- **GenericSlider**: Versatile slider component supporting multiple card types
- **ServicesCard**: Service showcase cards with hover effects
- **PortfolioCard**: Portfolio project display cards
- **ReviewCard**: Customer testimonial cards with star ratings
- **Blog**: Blog post preview cards
- **ArrowButton**: Animated arrow button component
- **OrangeButton**: Styled orange button component
- **DualButtons**: Toggle button component

## 📊 Data Structure

The application uses TypeScript interfaces for type safety:

```typescript
interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string;
  dotColor: string;
}

interface PortfolioItem {
  image: string;
  title: string;
  href: string;
  desc: string;
}

interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

interface Blog {
  image: string;
  button: string;
  name: string;
  date: string;
  title: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features

### Hero Section
- Animated text with custom typography
- Interactive hover effects
- Professional image display

### Services Section
- Slider showcasing different services
- Hover animations and transitions
- Professional service cards

### Work Experience
- Timeline-style experience display
- Responsive layout for mobile and desktop
- Interactive dot indicators

### Portfolio
- Project showcase with filtering
- Image galleries and descriptions
- Call-to-action buttons

### Testimonials
- Customer review cards with star ratings
- Slider functionality
- Professional testimonial layout

### Contact Section
- Email subscription form
- Social media integration
- Professional contact information

## 🎨 Design System

### Color Palette
- **Primary Orange**: #FD853A
- **Dark Gray**: #171717
- **Light Gray**: #F2F4F7
- **Text Colors**: #344054, #1D2939, #98A2B3
- **White**: #FCFCFD, #F9FAFB

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (monospace)
- **Responsive Text Sizes**: 4xl to 7xl for headings, base to xl for body text

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Responsive padding and margins
- Proper component spacing

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Content
1. Update data in `src/data/data.ts`
2. Add new SVG images to `public/` directory
3. Modify components as needed

### Styling Changes
- Use Tailwind CSS classes for styling
- Modify `globals.css` for custom styles
- Update component-specific styles

### Adding New Sections
1. Create new components in `src/components/ui/`
2. Add data interfaces in `src/data/data.ts`
3. Import and use in `src/app/page.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Deploy the `out` directory to your hosting platform


