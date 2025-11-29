# Toetally E-commerce Platform

> A modern, accessible e-commerce platform specializing in branded footwear

## Overview

Toetally is a React-based e-commerce application built with accessibility-first principles, ensuring all users can browse and purchase footwear regardless of their abilities or assistive technologies.

## Tech Stack

- **Frontend**: React 18+, React Router DOM
- **Styling**: Tailwind CSS, React Bootstrap
- **Animations**: Framer Motion
- **Forms**: Formspree, Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

## Key Features

### User Authentication
- 🔐 User registration (Sign Up)
- 🔑 Secure login with JWT tokens
- 👤 User profile management
- 🔒 Protected routes for authenticated users
- 🚪 Logout with confirmation modal

### Shopping Experience
- 🏠 Home page with featured products and promotions
- 🏪 Shop page with product grid and filtering
- 🛍️ Product catalog with search functionality
- 🛒 Shopping cart with quantity management
- 💳 Checkout process
- 📦 Order summary and review
- 💰 Price calculations

### Content & Communication
- 📱 Fully responsive design (mobile, tablet, desktop)
- ♿ WCAG 2.1 Level AA accessibility compliance
- 📧 Contact form with real-time validation
- 📰 Newsletter subscription
- ⭐ Customer testimonials
- 📝 Blog section
- ℹ️ About Us page with mission and team

## Accessibility Highlights

### Semantic HTML
All components use proper HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)

### ARIA Implementation
```javascript
// Navigation
aria-label="Main navigation"
aria-current="page"
aria-expanded={isOpen}

// Forms
aria-required="true"
aria-invalid={hasError}
aria-describedby="error-message"

// Modals
role="dialog"
aria-modal="true"
aria-labelledby="modal-title"

// Live Regions
aria-live="polite"
role="alert"
```

### Keyboard Navigation
- ✅ Full keyboard accessibility
- ✅ Escape key closes modals
- ✅ Enter key submits forms
- ✅ Logical tab order
- ✅ Visible focus indicators

### Screen Reader Support
- Hidden labels for context (`visually-hidden` class)
- Descriptive `aria-label` attributes
- Proper heading hierarchy (h1 → h6)
- Alternative text for images
- Time elements with `dateTime` attributes

### Enhanced Navigation
- Sticky navigation appears when scrolling stops (1000ms delay)
- Smooth slide-down animation with cubic-bezier easing
- Breadcrumb navigation on all pages
- Mobile-friendly drawer menu

## Component Structure

```
src/
├── pages/
│   ├── Home.jsx             # Home page with featured products
│   ├── Shop.jsx             # Product listing with filters
│   ├── Login.jsx            # User login page
│   ├── Signup.jsx           # User registration page
│   ├── Cart.jsx             # Shopping cart page
│   ├── Checkout.jsx         # Checkout process
│   ├── About.jsx            # About us page
│   ├── Contact.jsx          # Contact page
│   └── Blog.jsx             # Blog listing page
├── components/
│   ├── Nav.jsx              # Main navigation with sticky behavior
│   ├── Drawer.jsx           # Mobile navigation drawer
│   ├── ContactForm.jsx      # Accessible contact form
│   ├── Subscribe.jsx        # Newsletter subscription
│   ├── Mission.jsx          # Company stats & team
│   ├── Testimonials.jsx     # Customer reviews
│   ├── Hero.jsx             # Page hero sections
│   └── ActionButton.jsx     # Reusable button component
```

## Form Validation

All forms (Login, Signup, Contact, Checkout) include:
- Real-time validation with visual feedback
- Error messages with `role="alert"`
- Clear error identification
- Required field indicators
- Email format validation
- Password strength requirements (Signup)
- Accessible error announcements for screen readers

## Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## Accessibility Testing

### Recommended Tools
- **Screen Readers**: NVDA, JAWS, VoiceOver, TalkBack
- **Automated**: axe DevTools, WAVE, Lighthouse
- **Manual**: Keyboard testing, zoom to 200%, high contrast mode

### Testing Checklist
- [ ] Keyboard navigation works throughout all pages
- [ ] Screen reader announces all content correctly
- [ ] Home page featured products are accessible
- [ ] Shop page filters work with keyboard and screen readers
- [ ] Login/Signup forms validate and show errors accessibly
- [ ] Cart updates announce changes to screen readers
- [ ] Checkout process is keyboard accessible
- [ ] Modals trap focus properly
- [ ] Color contrast meets WCAG standards
- [ ] Text remains readable at 200% zoom
- [ ] Authentication states update appropriately

## Installation

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```env
VITE_API_URL=https://backend-toetally-1.onrender.com
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading for images
- Viewport-triggered animations
- Debounced scroll handlers
- GPU-accelerated CSS transforms
- Route-based code splitting

## Best Practices

✅ Semantic HTML structure  
✅ WCAG 2.1 AA compliance  
✅ Keyboard accessible  
✅ Screen reader optimized  
✅ Mobile-first responsive design  
✅ Error prevention and recovery  
✅ Loading states and feedback  
✅ Consistent component patterns  

## Contributing

1. Follow existing code style and patterns
2. Maintain accessibility standards
3. Test with keyboard and screen readers
4. Ensure responsive design works across devices
5. Add appropriate ARIA labels and semantic HTML


**Built with ♿ accessibility in mind**